import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [texto, setTexto] = useState("");
  const [arquivo, setArquivo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Atualiza classe do body
  useEffect(() => {
    document.body.className = darkMode ? "dark-body" : "";
  }, [darkMode]);

  const API_URL = "https://classificador-email-backend.onrender.com/processar-email";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResultado(null);

    try {
      const formData = new FormData();
      if (texto) formData.append("texto", texto);
      if (arquivo) formData.append("arquivo", arquivo);

      const res = await fetch(API_URL, { method: "POST", body: formData });
      if (!res.ok) throw new Error(`Erro: ${res.status}`);

      const data = await res.json();
      setResultado(data);
    } catch (err) {
      console.error(err);
      setError("Falha ao processar o email. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const confPct = resultado ? Math.round(resultado.confianca * 100) : 0;

  return (
    <>
      <button className="mode-btn" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
      <div className={`container ${darkMode ? "dark" : ""}`}>
        <div className="top-bar">
          <h1 id="title">Classificador de E-mails</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder="Cole o conteúdo do email aqui..."
              rows="6"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="file"
              accept=".txt,.pdf"
              className="form-control"
              onChange={(e) => setArquivo(e.target.files[0])}
            />
          </div>

          <button
            className="btn btn-primary w-100"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <span className="loading">
                <div className="spinner"></div> Processando...
              </span>
            ) : (
              "Processar Email"
            )}
          </button>
        </form>

        {error && <div className="alert alert-danger mt-3">{error}</div>}

        {resultado && (
          <div className="result-box">
            <p>
              <strong>Categoria:</strong>{" "}
              <span
                className={`badge ${
                  resultado.categoria === "Produtivo"
                    ? "bg-success"
                    : "bg-secondary"
                }`}
              >
                {resultado.categoria}
              </span>
            </p>

            <p>
              <strong>Confiança:</strong>
            </p>
            <div
              className="progress mb-3"
              aria-label="Confiança do classificador"
            >
              <div
                className={`progress-bar ${
                  resultado.categoria === "Produtivo"
                    ? "bg-success"
                    : "bg-secondary"
                }`}
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={confPct}
                style={{ width: `${confPct}%` }}
              >
                {confPct}%
              </div>
            </div>

            <div>
              <strong>Resposta sugerida:</strong>
              <pre className="mt-2 form-control" >{resultado.resposta_sugerida}</pre>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
