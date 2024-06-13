package lk.earth.earthuniversity.report;

import lk.earth.earthuniversity.report.dao.CountByCategoryDao;
import lk.earth.earthuniversity.report.dao.CountByDesignaitonDao;
import lk.earth.earthuniversity.report.entity.CountByCategory;
import lk.earth.earthuniversity.report.entity.CountByDesignation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/reports")
public class ReportController {
    @Autowired
    private CountByDesignaitonDao countbydesignaitondao;
    @Autowired
    private CountByCategoryDao countbycategorydao;

    @GetMapping(path ="/countbydesignation",produces = "application/json")
    public List<CountByDesignation> get() {

        List<CountByDesignation> designations = this.countbydesignaitondao.countByDesignation();
        long totalCount = 0;

        for (CountByDesignation countByDesignation : designations) {
            totalCount += countByDesignation.getCount();
        }

        for (CountByDesignation countByDesignation : designations) {
            long count = countByDesignation.getCount();
            double percentage = (double) count / totalCount * 100;
            percentage = Math.round(percentage * 100.0) / 100.0;
            countByDesignation.setPercentage(percentage);
        }

        return designations;
    }

    @GetMapping(path ="/itemcountbycategory",produces = "application/json")
    public List<CountByCategory> getCountByCategory() {

        List<CountByCategory> countByCategories = this.countbycategorydao.findCountByCategory();
        return countByCategories;
    }
}


