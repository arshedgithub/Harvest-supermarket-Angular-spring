package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.ItemstatusDao;
import lk.earth.earthuniversity.dao.UnittypeDao;
import lk.earth.earthuniversity.entity.Itemstatus;
import lk.earth.earthuniversity.entity.Unittype;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/unittypes")
public class UnittypeController {

    @Autowired
    private UnittypeDao unittypeDao;

    @GetMapping(path ="/list",produces = "application/json")
    public List<Unittype> get() {

        List<Unittype> unittypes = this.unittypeDao.findAll();

        unittypes = unittypes.stream().map(
                unittype -> { Unittype i = new Unittype();
                    i.setId(unittype.getId());
                    i.setName(unittype.getName());
                    return i; }
        ).collect(Collectors.toList());

        return unittypes;

    }

}


