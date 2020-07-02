package br.com.okamotocorp.projeto.dao;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import br.com.okamotocorp.projeto.dto.Contadores;
import br.com.okamotocorp.projeto.model.Transacao;

public interface TransacaoDAO extends CrudRepository<Transacao, Integer>{
	@Query("SELECT new br.com.okamotocorp.projeto.dto.Contadores(t.status, count(t.status)) FROM Transacao t WHERE agente.id=:id GROUP BY status")
	public ArrayList<Contadores> getTotaisPorId(@Param("id") int id);
	
}