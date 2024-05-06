package lk.earth.earthuniversity.dao;


import lk.earth.earthuniversity.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemDao extends JpaRepository<Item,Integer> {

}
