package br.com.okamotocorp.projeto.dao;

import org.springframework.data.repository.CrudRepository;

import br.com.okamotocorp.projeto.model.Usuario;

public interface UsuarioDAO extends CrudRepository <Usuario, Integer> {

	public Usuario findByEmailAndSenha(String email, String senha);
	public Usuario findByRacfOrEmail(String racf, String email);

}
