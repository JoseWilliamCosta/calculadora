import {
  StyleSheet,
  Dimensions,
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
  const [operacao, setOp] = useState(null);

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

  // Adiciona o operador (+, -, etc.)
  const adicionarOperacao = (op) => {
    setValor((prev) => prev + op);
    setOp(op);
  };

  const igual = () => {
    if (operacao === "+") {
      const numeros = valor.split("+");
      if (numeros.length === 2) {
        const reslocal = parseInt(numeros[0]) + parseInt(numeros[1]);
        setRes(reslocal);
      }
    }
    if (operacao === "-") {
      const numeros = valor.split("-");
      if (numeros.length === 2) {
        const reslocal = parseInt(numeros[0]) - parseInt(numeros[1]);
        setRes(reslocal);
      }
    }
    if (operacao === "x") {
      const numeros = valor.split("x");
      if (numeros.length === 2) {
        const reslocal = parseInt(numeros[0]) * parseInt(numeros[1]);
        setRes(reslocal);
      }
    }
    if (operacao === "/") {
      const numeros = valor.split("/");
      if (numeros.length === 2) {
        if ((parseInt(numeros[0]) != 0) & (parseInt(numeros[1]) != 0)) {
          const reslocal = parseInt(numeros[0]) / parseInt(numeros[1]);
          setRes(reslocal);
        } else {
          let av = "Você não pode dividir por 0 !!";
          setRes(av);
        }
      }
    }
  };

  return (
    <View style={styles.areatotal}>
      <View style={styles.areacalculo}>
        <View style={styles.areahistorico}>
          <Text>Histórico</Text>
        </View>
        <View style={styles.areaexprecao}>
          <TextInput
            style={{ textAlign: "right" }}
            value={valor}
            onChangeText={(v1) => setValor(v1)}
          />
          <Text>{resultado}</Text>
        </View>
      </View>
      <View style={styles.areateclas}>
        <View style={styles.arealinha}>
          <TouchableOpacity style={styles.areabotao} onPress={apagaTudo}>
            <Text style={styles.textobotao}>AC</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.areabotao} onPress={apagar}>
            <Text style={styles.textobotao}>C</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.areabotao}
            onPress={() => adicionarOperacao("%")}
          >
            <Text style={styles.textobotao}>%</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.areabotao}
            onPress={() => adicionarOperacao("/")}
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
            onPress={() => adicionarOperacao("x")}
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
            onPress={() => adicionarOperacao("-")}
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
            onPress={() => adicionarOperacao("+")}
          >
            <Text style={styles.textobotao}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.arealinha}>
          <TouchableOpacity style={styles.areabotao}>
            <Text style={styles.textobotao}>Tro</Text>
          </TouchableOpacity>
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
    padding: 10,
    justifyContent: "center",
  },
  areahistorico: {
    borderColor: "blue",
    borderWidth: 1,
    marginVertical: 5,
    padding: 5,
    alignItems: "flex-end",
  },
  areaexprecao: {
    borderColor: "blue",
    borderWidth: 1,
    marginVertical: 5,
    padding: 5,
    alignItems: "flex-end",
  },
  areateclas: {
    width: "100%",
    paddingVertical: 10,
    justifyContent: "space-evenly",
  },
  arealinha: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginVertical: 5,
  },
  areabotao: {
    flex: 1,
    borderWidth: 1,
    backgroundColor: "black",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  textobotao: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
});
