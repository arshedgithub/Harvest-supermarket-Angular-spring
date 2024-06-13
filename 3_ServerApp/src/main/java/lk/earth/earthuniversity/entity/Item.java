package lk.earth.earthuniversity.entity;

import lk.earth.earthuniversity.util.RegexPattern;

import javax.persistence.*;
import javax.validation.constraints.Pattern;
import java.math.BigDecimal;
import java.sql.Date;
import java.util.Arrays;
import java.util.Objects;

@Entity
public class Item {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Integer id;
    @Basic
    @Column(name = "name")
    @Pattern(regexp = "^[A-Z][a-z]+\\s[A-Z][a-z]+(?:\\s[A-Z][a-z]+)?\\s[\\d]{1,3}(kg|g|ml|l)$", message = "Invalid Name")
    private String name;
    @Basic
    @Column(name = "code")
    @Pattern(regexp = "^[I]\\d{5}$", message = "Invalid Item Code")
    private String code;
    @Basic
    @Column(name = "sprice")
    @RegexPattern(reg = "^\\d{2,4}(?:[.][\\d]{2})?$", msg = "Invalid Price")
    private BigDecimal sprice;
    @Basic
    @Column(name = "pprice")
    @RegexPattern(reg = "^\\d{2,4}(?:[.][\\d]{2})?$", msg = "Invalid Price")
    private BigDecimal pprice;
    @Basic
    @Column(name = "photo")
    private byte[] photo;
    @Basic
    @Column(name = "quantity")
    @RegexPattern(reg = "^\\d{1,3}$", msg = "Invalid Quantity")
    private Integer quantity;
    @Basic
    @Column(name = "rop")
    @RegexPattern(reg = "^\\d{1,3}$", msg = "Invalid ROP")
    private Integer rop;
    @Basic
    @Column(name = "dointroduced")
    @RegexPattern(reg = "^\\d{2}-\\d{2}-\\d{2}$", msg = "Invalid Date Format")
    private Date dointroduced;
    @ManyToOne
    @JoinColumn(name = "brand_id", referencedColumnName = "id", nullable = false)
    private Brand brand;
    @ManyToOne
    @JoinColumn(name = "subcategory_id", referencedColumnName = "id", nullable = false)
    private Subcategory subcategory;
    @ManyToOne
    @JoinColumn(name = "unittype_id", referencedColumnName = "id", nullable = false)
    private Unittype unittype;
    @ManyToOne
    @JoinColumn(name = "itemstatus_id", referencedColumnName = "id", nullable = false)
    private Itemstatus itemstatus;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public BigDecimal getSprice() {
        return sprice;
    }

    public void setSprice(BigDecimal sprice) {
        this.sprice = sprice;
    }

    public BigDecimal getPprice() {
        return pprice;
    }

    public void setPprice(BigDecimal pprice) {
        this.pprice = pprice;
    }

    public byte[] getPhoto() {
        return photo;
    }

    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Integer getRop() {
        return rop;
    }

    public void setRop(Integer rop) {
        this.rop = rop;
    }

    public Date getDointroduced() {
        return dointroduced;
    }

    public void setDointroduced(Date dointroduced) {
        this.dointroduced = dointroduced;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Item item = (Item) o;
        return Objects.equals(id, item.id) && Objects.equals(name, item.name) && Objects.equals(code, item.code) && Objects.equals(sprice, item.sprice) && Objects.equals(pprice, item.pprice) && Arrays.equals(photo, item.photo) && Objects.equals(quantity, item.quantity) && Objects.equals(rop, item.rop) && Objects.equals(dointroduced, item.dointroduced);
    }

    @Override
    public int hashCode() {
        int result = Objects.hash(id, name, code, sprice, pprice, quantity, rop, dointroduced);
        result = 31 * result + Arrays.hashCode(photo);
        return result;
    }

    public Brand getBrand() {
        return brand;
    }

    public void setBrand(Brand brand) {
        this.brand = brand;
    }

    public Subcategory getSubcategory() {
        return subcategory;
    }

    public void setSubcategory(Subcategory subcategory) {
        this.subcategory = subcategory;
    }

    public Unittype getUnittype() {
        return unittype;
    }

    public void setUnittype(Unittype unittype) {
        this.unittype = unittype;
    }

    public Itemstatus getItemstatus() {
        return itemstatus;
    }

    public void setItemstatus(Itemstatus itemstatus) {
        this.itemstatus = itemstatus;
    }
}
