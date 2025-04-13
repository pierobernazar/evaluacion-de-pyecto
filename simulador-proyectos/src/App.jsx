import React, { useState, useEffect } from "react";
import questionsBank from "./questionsBank";

function App() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const shuffled = [...questionsBank].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, 10)); // 10 preguntas aleatorias
  }, []);

  const handleAnswer = (index) => {
    setSelected(index);
    if (index === questions[current].answer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    setSelected(null);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  };

  if (questions.length === 0) return <h2>Cargando preguntas...</h2>;

  return (
    <div style={{ padding: 30, fontFamily: "Arial" }}>
      <h1>Simulador Proyectos - Prueba N°1</h1>
      {!finished ? (
        <>
          <h2>Pregunta {current + 1} de {questions.length}</h2>
          <h3>{questions[current].question}</h3>
          {questions[current].options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              disabled={selected !== null}
              style={{
                display: "block",
                margin: "8px 0",
                padding: "10px",
                backgroundColor: selected === i
                  ? i === questions[current].answer ? "#a5d6a7" : "#ef9a9a"
                  : "#f5f5f5",
                border: "1px solid #ccc",
                borderRadius: "5px",
                cursor: selected === null ? "pointer" : "default"
              }}
            >
              {String.fromCharCode(65 + i)}. {opt}
            </button>
          ))}
          <button
            onClick={nextQuestion}
            disabled={selected === null}
            style={{
              marginTop: 20,
              padding: "10px 20px",
              backgroundColor: "#1976d2",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: selected !== null ? "pointer" : "not-allowed"
            }}
          >
            Siguiente
          </button>
        </>
      ) : (
        <div>
          <h2>¡Completaste la prueba!</h2>
          <p>Tu puntaje: {score} de {questions.length}</p>
          <button onClick={() => window.location.reload()}>
            Volver a intentar
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
