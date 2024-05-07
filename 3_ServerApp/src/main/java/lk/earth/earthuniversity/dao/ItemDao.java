package lk.earth.earthuniversity.dao;


import lk.earth.earthuniversity.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ItemDao extends JpaRepository<Item,Integer> {

    @Query("select i from Item i where i.code=:code ")
    Item findByCode(@Param("code")String code);

    @Query("select i from Item i where i.name=:name")
    Item findByName(@Param("name")String name);

    @Query("select i from Item i where i.id=:id")
    Item findByMyId(@Param("id")Integer id);

}
