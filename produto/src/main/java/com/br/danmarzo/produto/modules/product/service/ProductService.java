package com.br.danmarzo.produto.modules.product.service;

import com.br.danmarzo.produto.config.exception.SuccessResponse;
import com.br.danmarzo.produto.config.exception.ValidationException;
import com.br.danmarzo.produto.domain.ProductEntity;
import com.br.danmarzo.produto.modules.category.service.CategoryService;
import com.br.danmarzo.produto.modules.product.dto.*;
import com.br.danmarzo.produto.modules.product.repository.ProductRepository;
import com.br.danmarzo.produto.modules.sales.client.SalesClient;
import com.br.danmarzo.produto.modules.sales.dto.SalesConfirmationDTO;
import com.br.danmarzo.produto.modules.sales.enums.SalesStatusEnum;
import com.br.danmarzo.produto.modules.sales.rabbitmq.SalesConfirmationSender;
import com.br.danmarzo.produto.modules.supplier.service.SupplierService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.util.ObjectUtils.isEmpty;

@Slf4j
@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private SupplierService supplierService;
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private SalesConfirmationSender salesConfirmationSender;

    @Autowired
    private SalesClient salesClient;

    public List<ProductResponseDTO> findByName(String name) {
        if (isEmpty(name)) {
            throw new ValidationException("The product name must be informed");
        }
        return this.productRepository.findByNameIgnoreCaseContaining(name).stream().map(ProductResponseDTO::of).collect(Collectors.toList());
    }

    public List<ProductResponseDTO> findAll() {
        return this.productRepository.findAll().stream().map(ProductResponseDTO::of).collect(Collectors.toList());
    }

    public ProductResponseDTO findByIdResponse(Integer id) {
        return ProductResponseDTO.of(this.findById(id));
    }

    public ProductEntity findById(Integer id) {
        if (isEmpty(id)) {
            throw new ValidationException("Id must be informed");
        }
        return this.productRepository.findById(id).orElseThrow(() -> new ValidationException("There's no product for the given ID."));
    }

    public ProductResponseDTO save(ProductRequestDTO request) {
        this.validateCategoryAndSupplierId(request);
        this.validateProductDataInformed(request);
        var category = this.categoryService.findById(request.getCategoryId());
        var supplier = this.supplierService.findById(request.getSupplierId());
        var product = this.productRepository.save(ProductEntity.of(request, supplier, category));
        return ProductResponseDTO.of(product);
    }

    public ProductResponseDTO update(ProductRequestDTO request, Integer id) {
        this.validateCategoryAndSupplierId(request);
        this.validateProductDataInformed(request);

        var category = this.categoryService.findById(request.getCategoryId());
        var supplier = this.supplierService.findById(request.getSupplierId());
        var product = ProductEntity.of(request, supplier, category);
        product.setId(id);
        this.productRepository.save(product);
        return ProductResponseDTO.of(product);
    }

    public List<ProductResponseDTO> findByCategoryId(Integer id) {
        if (isEmpty(id)) {
            throw new ValidationException("Id category must be informed.");
        }
        return this.productRepository.findByCategoryId(id).stream().map(ProductResponseDTO::of).collect(Collectors.toList());
    }

    public List<ProductResponseDTO> findBySupplierId(Integer id) {
        if (isEmpty(id)) {
            throw new ValidationException("Id supplier must be informed.");
        }
        return this.productRepository.findBySupplierId(id).stream().map(ProductResponseDTO::of).collect(Collectors.toList());
    }

    public Boolean existsByCategoryId(Integer id) {
        return this.productRepository.existsByCategoryId(id);
    }

    public Boolean existsBySupplierId(Integer id) {
        return this.productRepository.existsBySupplierId(id);
    }

    public SuccessResponse delete(Integer id) {
        this.validateProductIdInformed(id);
        this.productRepository.deleteById(id);
        return SuccessResponse.create("The product was deleted.");
    }

    public SuccessResponse CheckStock(ProductCheckStockRequestDTO checkStockRequestDTO) {
        if (isEmpty(checkStockRequestDTO) || isEmpty(checkStockRequestDTO.getProducts())) {
            throw new ValidationException("The request data and products must be informed.");
        }
        checkStockRequestDTO
                .getProducts()
                .forEach(this::validateStock);
        return SuccessResponse.create("The stock is ok!");
    }

    private void validateStock(ProductQuantityDTO productQuantity) {
        if (isEmpty(productQuantity) || isEmpty(productQuantity.getQuantity())) {
            throw new ValidationException("Product ID and quantity must be informed.");
        }
        var product = findById(productQuantity.getProductId());
        if (product.getQuantityAvailable() < productQuantity.getQuantity()) {
            throw new ValidationException(String.format("The product %s is out of stock", product.getId()));
        }
    }

    @Transactional
    public void updateProductStock(ProductStockDTO product) {
        try {
            this.validateStockUpdateData(product);
            var productsUpdate = new ArrayList<ProductEntity>();

            product.getProducts().forEach(prod -> {
                var productEntity = this.findById(prod.getProductId());
                if (prod.getQuantity() > productEntity.getQuantityAvailable()) {
                    throw new ValidationException("The product stock can`t be update");
                }
                productEntity.updateStock(prod.getQuantity());
                productsUpdate.add(productEntity);
            });
            if (isEmpty(productsUpdate)) {
                throw new ValidationException("Lista produtos invalida");
            }
            this.productRepository.saveAll(productsUpdate);
            log.info("Message approved");
            var approvedSend = new SalesConfirmationDTO(product.getSalesId(), SalesStatusEnum.APPROVED);
            this.salesConfirmationSender.sendSalesConfirmationMessage(approvedSend);
        } catch (Exception e) {
            log.error("Error while trying to update stock for message with error.");
            var rejectSend = new SalesConfirmationDTO(product.getSalesId(), SalesStatusEnum.REJECT);
            this.salesConfirmationSender.sendSalesConfirmationMessage(rejectSend);
        }
    }

    private void validateStockUpdateData(ProductStockDTO product) {
        if (isEmpty(product) || isEmpty(product.getSalesId())) {
            throw new ValidationException("The product data and the sales id must be informed.");
        }
        if (isEmpty(product) || isEmpty(product.getProducts())) {
            throw new ValidationException("The sales products must be informed.");
        }
        product.getProducts().forEach(salesPro -> {
            if (isEmpty(salesPro.getQuantity()) || isEmpty(salesPro.getProductId())) {
                throw new ValidationException("The product id and the quantity must be informed.");
            }
        });
    }

    private void validateProductIdInformed(Integer id) {
        if (isEmpty(id)) {
            throw new ValidationException("Product id must be informed.");
        }
    }

    private void validateProductDataInformed(ProductRequestDTO request) {
        if (isEmpty(request.getName())) {
            throw new ValidationException("The product name was not informed.");
        }
        if (isEmpty(request.getQuantityAvailable())) {
            throw new ValidationException("The product's quantity was not informed.");
        }
    }

    private void validateCategoryAndSupplierId(ProductRequestDTO request) {
        if (isEmpty(request.getCategoryId())) {
            throw new ValidationException("The category id was not informed.");
        }
        if (isEmpty(request.getSupplierId())) {
            throw new ValidationException("The supplier id was not informed.");
        }
    }

    public ProductSalesResponseDTO findProductSales(Integer id) {
        var product = findById(id);
        try {
            var sales = this.salesClient.findSalesByProductId(id).orElseThrow(() -> new ValidationException("The sales was not found this product."));
            return ProductSalesResponseDTO.of(product, sales.getSalesId());
        } catch (Exception e) {
            throw new ValidationException("There was an error trying get the product's sales.");
        }
    }
}
