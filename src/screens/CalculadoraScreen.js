import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";

export default function App() {
  const [valor, setValor] = useState("");
  const [resultado, setRes] = useState(null);
  const [historico, setHistorico] = useState([]);

  // apagar numero por numero
  const apagar = () => {
    setValor((prev) => prev.slice(0, -1));
  };
  
  // apaga tudo
  const apagaTudo = () => {
    setValor("");
    setRes("");
  };

  // Adiciona número ao valor
  const adicionarNumero = (numero) => {
    setValor((prev) => prev + numero);
  };

  // Tokeniza expressão: ["8", "+", "9", "*", "7", "+", "0", "+", "6"]
  // /padrão(indentificar expressões decimais)/modificadores = /\d+(?:\.\d+)?%?|[+\-x*/]/g;
  // nome: regex
  const tokenize = (expr) => {
    return expr.match(/\d+(?:\.\d+)?%?|[+\-x*/]/g);
  };
  
  // Conversão de tokens com % para valor decimal
  const tratarPorcentagem = (tokens) => {
    return tokens.map(token => {
      if (token.endsWith("%")) {
        const numero = parseFloat(token.replace("%", ""));
        return (numero / 100).toString();
      }
      return token;
    });
  };


   // Resolve multiplicação e divisão primeiro
  const processMultiplicacaoDivisao = (tokens) => {
    const resultado = [];

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      if (token === "x" || token === "*" || token === "/") {

        const anterior = parseFloat(resultado.pop());
        const proximo = parseFloat(tokens[++i]);

        if ((token === "/" || token === "÷") && proximo === 0) {
          throw new Error("Você não pode dividir por zero!");
        }

        const calculado =
          token === "x" || token === "*" ? anterior * proximo : anterior / proximo;

        resultado.push(calculado.toString());
      } else {
        resultado.push(token);
      }
    }

    return resultado;
  };

  // Resolve soma e subtração
  const processSomaSubtracao = (tokens) => {
    let total = parseFloat(tokens[0]);

    for (let i = 1; i < tokens.length; i += 2) {
      const operador = tokens[i];
      const proximo = parseFloat(tokens[i + 1]);

      if (operador === "+") {
        total += proximo;
      } else if (operador === "-") {
        total -= proximo;
      }
    }

    return total;
  };


  const igual = () => {
    try {
      const tokens = tokenize(valor);
      const tokensComPorcentagem = tratarPorcentagem(tokens);
      const etapa1 = processMultiplicacaoDivisao(tokensComPorcentagem);
      const final = processSomaSubtracao(etapa1);
      setRes(final);


      // aqui é onde ele guarda na lista do historico
      setHistorico((prev) => {
        let novo = [`${valor} = ${final}`, ...prev];
        if (novo.length > 8){
          novo.pop();
        }
        return novo;
      });
        
      
     

    } catch (e) {
       setRes(e.message || "Erro no cálculo");
    }
  };



  return (
    <View style={styles.areatotal}>
      <View style={styles.areacalculo}>
        <View style={styles.areahistorico}>
            {historico.map((item, index) => (
              <Text key={index}>{item}</Text>
            ))}
        </View>
        <View style={styles.areaexprecao}>
  <Text style={styles.titulo}>Expressão</Text>
  <TextInput
    style={styles.textInput}
    value={valor}
    onChangeText={(v1) => setValor(v1)}
    textAlign="right"
  />
  <Text style={styles.resultado}>{resultado}</Text>
</View>
      </View>
      <View style={styles.areateclas}>
        <View style={styles.arealinha}>
          <TouchableOpacity style={styles.areabotao} onPress={apagaTudo}>
            <Text style={styles.textobotao}>AC</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.areabotao} onPress={apagar}>
            <Text style={styles.textobotao}>DEL</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.areabotao}
            onPress={() => adicionarNumero("%")}
          >
            <Text style={styles.textobotao}>%</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.areabotao}
            onPress={() => adicionarNumero("/")}
          >
            <Text style={styles.textobotao}>/</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.arealinha}>
          <TouchableOpacity
            style={styles.areabotao}
            onPress={() => adicionarNumero("7")}
          >
            <Text style={styles.textobotao}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.areabotao}
            onPress={() => adicionarNumero("8")}
          >
            <Text style={styles.textobotao}>{8}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.areabotao}
            onPress={() => adicionarNumero("9")}
          >
            <Text style={styles.textobotao}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.areabotao}
            onPress={() => adicionarNumero("x")}
          >
            <Text style={styles.textobotao}>x</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.arealinha}>
          <TouchableOpacity
            style={styles.areabotao}
            onPress={() => adicionarNumero("4")}
          >
            <Text style={styles.textobotao}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.areabotao}
            onPress={() => adicionarNumero("5")}
          >
            <Text style={styles.textobotao}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.areabotao}
            onPress={() => adicionarNumero("6")}
          >
            <Text style={styles.textobotao}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.areabotao}
            onPress={() => adicionarNumero("-")}
          >
            <Text style={styles.textobotao}>-</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.arealinha}>
          <TouchableOpacity
            style={styles.areabotao}
            onPress={() => adicionarNumero("1")}
          >
            <Text style={styles.textobotao}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.areabotao}
            onPress={() => adicionarNumero("2")}
          >
            <Text style={styles.textobotao}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.areabotao}
            onPress={() => adicionarNumero("3")}
          >
            <Text style={styles.textobotao}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.areabotao}
            onPress={() => adicionarNumero("+")}
          >
            <Text style={styles.textobotao}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.arealinha}>
          
          <TouchableOpacity
            style={styles.areabotao}
            onPress={() => adicionarNumero("0")}
          >
            <Text style={styles.textobotao}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.areabotao}
            onPress={() => adicionarNumero(".")}
          >
            <Text style={styles.textobotao}>.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.areabotao}>
            <Text style={styles.textobotao}>+/-</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.areabotao} onPress={igual}>
            <Text style={styles.textobotao}>=</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  areatotal: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  areacalculo: {
    width: "90%",
    marginBottom: 10,
  },
  areahistorico: {
    borderColor: "#333",
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#fff",
    height: 160, 
    marginBottom: 10,
  },
  areaexprecao: {
    borderColor: "#333",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#fff",
    height: 100, 
  },
  areateclas: {
    width: "100%",
    justifyContent: "space-evenly",
  },
  arealinha: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 5,
  },
  areabotao: {
    flex: 1,
    backgroundColor: "#999",
    paddingVertical: 20,
    marginHorizontal: 5,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  textobotao: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
});
