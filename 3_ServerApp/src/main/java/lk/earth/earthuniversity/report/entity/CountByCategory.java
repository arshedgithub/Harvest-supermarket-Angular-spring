package lk.earth.earthuniversity.report.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class CountByCategory {

    @Id
    private Integer id;
    private String categoryName;
    private Long count;

    public CountByCategory() {  }

    public CountByCategory(String categoryName, Long count) {
        this.categoryName = categoryName;
        this.count = count;
    }

    public String getDesignation() {
        return categoryName;
    }
    public void setDesignation(String categoryName) {
        this.categoryName = categoryName;
    }
    public Long getCount() {
        return count;
    }
    public void setCount(Long count) {
        this.count = count;
    }

    public void setId(Integer id) { this.id = id; }

    public Integer getId() { return id; }
}
