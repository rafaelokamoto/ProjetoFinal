package br.com.okamotocorp.projeto.dao;

import org.springframework.data.repository.CrudRepository;

import br.com.okamotocorp.projeto.model.Departamento;

public interface DepartamentoDAO extends CrudRepository <Departamento, Integer>{

}
