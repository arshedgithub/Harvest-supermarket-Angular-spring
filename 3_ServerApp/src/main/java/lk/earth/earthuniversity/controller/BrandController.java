package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.BrandDao;
import lk.earth.earthuniversity.entity.Brand;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/brands")
public class BrandController {

    @Autowired
    private BrandDao brandDao;

    @GetMapping(path ="/list",produces = "application/json")
    public List<Brand> get() {

        List<Brand> brands = this.brandDao.findAll();

        brands = brands.stream().map(
                brand -> { Brand b = new Brand();
                    b.setId(brand.getId());
                    b.setName(brand.getName());
                    return b; }
        ).collect(Collectors.toList());

        return brands;

    }

}


