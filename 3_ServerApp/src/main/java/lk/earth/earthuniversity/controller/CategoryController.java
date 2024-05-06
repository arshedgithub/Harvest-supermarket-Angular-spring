package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.CategoryDao;
import lk.earth.earthuniversity.dao.GenderDao;
import lk.earth.earthuniversity.entity.Category;
import lk.earth.earthuniversity.entity.Gender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/categories")
public class CategoryController {

    @Autowired
    private CategoryDao categoryDao;

    @GetMapping(path ="/list",produces = "application/json")
    public List<Category> get() {

        List<Category> categories = this.categoryDao.findAll();

        categories = categories.stream().map(
                category -> { Category c = new Category();
                    c.setId(category.getId());
                    c.setName(category.getName());
                    return c; }
        ).collect(Collectors.toList());

        return categories;

    }

}


