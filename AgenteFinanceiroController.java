package br.com.okamotocorp.projeto.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import br.com.okamotocorp.projeto.dao.AgenteFinanceiroDAO;
import br.com.okamotocorp.projeto.dao.TransacaoDAO;
import br.com.okamotocorp.projeto.dto.AgenteFinanceiroDash;
import br.com.okamotocorp.projeto.dto.Contadores;
import br.com.okamotocorp.projeto.model.AgenteFinanceiro;
import br.com.okamotocorp.projeto.model.Transacao;

@RestController
@CrossOrigin("*")
public class AgenteFinanceiroController {
	
	@Autowired
	private AgenteFinanceiroDAO dao;
	
	@Autowired
	private TransacaoDAO dao2;
	
	@GetMapping("/agentefinanceiro")
	public ArrayList<AgenteFinanceiro> recuperarTopTen(){
		ArrayList<AgenteFinanceiro> lista ;
		lista = (ArrayList<AgenteFinanceiro>)dao.findAllByOrderByVolumeDesc();
		return lista;
	}
	
	@GetMapping("/agentefinanceiro/{id}")
	public ResponseEntity<AgenteFinanceiro> recuperarPeloId(@PathVariable int id){
		AgenteFinanceiro a = dao.findById(id).orElse(null);
		if (a != null) {
			return ResponseEntity.ok(a);
		}
		else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@GetMapping("/agentesfinanceiros/{id}/dashboard")
	public ResponseEntity<AgenteFinanceiroDash> recuperaDashBoardPeloId(@PathVariable int id){
		AgenteFinanceiro a = dao.findById(id).orElse(null);
		if (a != null) {
			// agora faço a lógica da montagem do dashboard
			AgenteFinanceiroDash dash = new AgenteFinanceiroDash();
			dash.setId(a.getId());
			dash.setNome(a.getNome());
			dash.setVolume(a.getVolume());
			int totalOk = 0;
			int totalFalha = 0;
			int totalFraude = 0;
			for (Transacao tr : a.getListaTransacoes()) {
				switch(tr.getStatus()) {
				case 0: totalOk++; break;
				case 1: totalFalha++; break;
				case 2: totalFraude++; break;
				}
			}
			dash.setStatusOk(totalOk);
			dash.setStatusFalha(totalFalha);
			dash.setStatusFraude(totalFraude);
			return ResponseEntity.ok(dash);
		}
		else {
			return ResponseEntity.notFound().build();
		}
	}

	@GetMapping("/teste")
	public String teste() {
		
		System.out.println(dao2.getTotaisPorId(10).get(0).getClass().getName());
		
		ArrayList<Contadores> lista = dao2.getTotaisPorId(10);
		System.out.println(lista.size());
		for (Contadores i:lista) {
			System.out.println("Result = "+i.getStatus()+"/"+i.getCountStatus());
		}
	    return "xis";
	}
	
	@GetMapping("/agentesfinanceiros/{id}/dashboardfinanceiro")
	public ResponseEntity<AgenteFinanceiroDash> recuperaDashBoardFinanceiroPeloId(@PathVariable int id){
		AgenteFinanceiro b = dao.findById(id).orElse(null);
		if (b != null) {
			// agora faço a lógica da montagem do dashboard
			AgenteFinanceiroDash dashFinanceiro = new AgenteFinanceiroDash();
			dashFinanceiro.setId(b.getId());
			dashFinanceiro.setNome(b.getNome());
			dashFinanceiro.setVolume(b.getVolume());
			double valorAutOk = 0;
			double valorSolOk = 0;
			double valorSolFalha = 0;
			double valorSolFraude = 0;
			for (Transacao tr : b.getListaTransacoes()) {
				if (tr.getStatus() == 0) {
					valorSolOk = valorSolOk + tr.getValorSolicitado();
					valorAutOk = valorAutOk  +tr.getValorAutotizado();
				}
				else {
					if (tr.getStatus() == 1) {
						valorSolFalha = valorSolFalha  +tr.getValorSolicitado(); 
					}
					else {
						if (tr.getStatus() == 2) {
							valorSolFraude =  valorSolFraude + tr.getValorSolicitado(); 
						}
					}
				}
				/*switch(tr.getStatus()) {
				case 0: 
					valorAutOk = valorAutOk  +tr.getValorAutotizado();
					valorSolOk = valorSolOk + tr.getValorSolicitado();
					break;
				case 1: 
					valorSolFalha = valorSolFalha  +tr.getValorSolicitado(); 
					break;
				case 2: 
					valorSolFraude =  valorSolFraude + tr.getValorSolicitado(); 
					break;
				}*/
			}
			System.out.println(valorAutOk);
			System.out.println(valorSolOk);
			dashFinanceiro.setStatusOkAut(valorAutOk);
			dashFinanceiro.setStatusOkSol(valorSolOk);
			dashFinanceiro.setStatusFalhaSol(valorSolFalha);
			dashFinanceiro.setStatusFraudeSol(valorSolFraude);
			return ResponseEntity.ok(dashFinanceiro);
		}
		else {
			return ResponseEntity.notFound().build();
		}
	}
}