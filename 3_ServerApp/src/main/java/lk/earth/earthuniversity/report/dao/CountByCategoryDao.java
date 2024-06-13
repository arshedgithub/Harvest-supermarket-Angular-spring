package lk.earth.earthuniversity.report.dao;

import lk.earth.earthuniversity.report.entity.CountByCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CountByCategoryDao extends JpaRepository<CountByCategory,Integer> {

    @Query(value = "SELECT new CountByCategory(c.name, count(i.name)) FROM Category c, Item i, Subcategory s where i.subcategory.id = s.id and s.category.id = c.id group by c.id")
    List<CountByCategory> findCountByCategory();

}

