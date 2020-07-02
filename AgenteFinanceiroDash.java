package br.com.okamotocorp.projeto.dto;

public class AgenteFinanceiroDash {
	private int id;
	private String nome;
	private float volume;
	private int   statusOk;
	private int   statusFalha;
	private int   statusFraude;
	private double statusOkAut;
	private double statusOkSol;
	private double statusFalhaSol;
	private double statusFraudeSol;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public float getVolume() {
		return volume;
	}
	public void setVolume(float volume) {
		this.volume = volume;
	}
	public int getStatusOk() {
		return statusOk;
	}
	public void setStatusOk(int statusOk) {
		this.statusOk = statusOk;
	}
	public int getStatusFalha() {
		return statusFalha;
	}
	public void setStatusFalha(int statusFalha) {
		this.statusFalha = statusFalha;
	}
	public int getStatusFraude() {
		return statusFraude;
	}
	public void setStatusFraude(int statusFraude) {
		this.statusFraude = statusFraude;
	}
	public double getStatusOkAut() {
		return statusOkAut;
	}
	public void setStatusOkAut(double statusOkAut) {
		this.statusOkAut = statusOkAut;
	}
	public double getStatusOkSol() {
		return statusOkSol;
	}
	public void setStatusOkSol(double statusOkSol) {
		this.statusOkSol = statusOkSol;
	}
	public double getStatusFalhaSol() {
		return statusFalhaSol;
	}
	public void setStatusFalhaSol(double statusFalhaSol) {
		this.statusFalhaSol = statusFalhaSol;
	}
	public double getStatusFraudeSol() {
		return statusFraudeSol;
	}
	public void setStatusFraudeSol(double statusFraudeSol) {
		this.statusFraudeSol = statusFraudeSol;
	}
}