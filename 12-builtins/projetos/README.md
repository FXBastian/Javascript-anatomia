# Projetos Praticos — Built-in Objects

## Projeto 1: Formatador de Datas Brasileiro

```javascript
class DataBR {
  #data;

  constructor(entrada) {
    this.#data = entrada ? new Date(entrada) : new Date();
  }

  formatar(formato = "dd/MM/yyyy") {
    const mapa = {
      dd: String(this.#data.getDate()).padStart(2, "0"),
      MM: String(this.#data.getMonth() + 1).padStart(2, "0"),
      yyyy: this.#data.getFullYear(),
      yy: String(this.#data.getFullYear()).slice(-2),
      HH: String(this.#data.getHours()).padStart(2, "0"),
      mm: String(this.#data.getMinutes()).padStart(2, "0"),
      ss: String(this.#data.getSeconds()).padStart(2, "0")
    };

    return Object.entries(mapa).reduce(
      (str, [token, valor]) => str.replace(token, valor),
      formato
    );
  }

  relativo() {
    const agora = Date.now();
    const diff = agora - this.#data.getTime();
    const seg = Math.floor(diff / 1000);
    const min = Math.floor(seg / 60);
    const hrs = Math.floor(min / 60);
    const dias = Math.floor(hrs / 24);

    if (seg < 60) return "agora mesmo";
    if (min < 60) return `${min} minuto${min > 1 ? "s" : ""} atras`;
    if (hrs < 24) return `${hrs} hora${hrs > 1 ? "s" : ""} atras`;
    if (dias < 30) return `${dias} dia${dias > 1 ? "s" : ""} atras`;
    return this.formatar();
  }

  static parse(dataStr) {
    // Aceitar formato brasileiro "dd/MM/yyyy"
    const [dia, mes, ano] = dataStr.split("/").map(Number);
    return new DataBR(new Date(ano, mes - 1, dia));
  }
}

const d = new DataBR();
console.log(d.formatar("dd/MM/yyyy HH:mm"));
console.log(DataBR.parse("25/12/2024").formatar());
```

---

## Projeto 2: Validador JSON com Schema

```javascript
function validarJSON(dados, schema) {
  const erros = [];

  for (const [campo, regras] of Object.entries(schema)) {
    const valor = dados[campo];

    if (regras.obrigatorio && (valor === undefined || valor === null)) {
      erros.push(`${campo}: campo obrigatorio`);
      continue;
    }

    if (valor === undefined) continue;

    if (regras.tipo && typeof valor !== regras.tipo) {
      erros.push(`${campo}: esperado ${regras.tipo}, recebido ${typeof valor}`);
    }

    if (regras.min !== undefined && valor < regras.min) {
      erros.push(`${campo}: valor minimo ${regras.min}`);
    }

    if (regras.max !== undefined && valor > regras.max) {
      erros.push(`${campo}: valor maximo ${regras.max}`);
    }

    if (regras.pattern && !regras.pattern.test(valor)) {
      erros.push(`${campo}: formato invalido`);
    }

    if (regras.enum && !regras.enum.includes(valor)) {
      erros.push(`${campo}: deve ser um de [${regras.enum.join(", ")}]`);
    }
  }

  return { valido: erros.length === 0, erros };
}

const schema = {
  nome: { obrigatorio: true, tipo: "string" },
  idade: { obrigatorio: true, tipo: "number", min: 0, max: 150 },
  email: { obrigatorio: true, tipo: "string", pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  role: { tipo: "string", enum: ["admin", "user", "editor"] }
};

console.log(validarJSON({ nome: "Ana", idade: 200, email: "invalido" }, schema));
```

---

## Projeto 3: Biblioteca Math Estendida

```javascript
const MathEx = {
  clamp(valor, min, max) {
    return Math.min(Math.max(valor, min), max);
  },

  lerp(a, b, t) {
    return a + (b - a) * MathEx.clamp(t, 0, 1);
  },

  mapear(valor, inMin, inMax, outMin, outMax) {
    return ((valor - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
  },

  aleatorioEntre(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  media(...valores) {
    return valores.reduce((a, b) => a + b, 0) / valores.length;
  },

  mediana(...valores) {
    const sorted = [...valores].sort((a, b) => a - b);
    const meio = Math.floor(sorted.length / 2);
    return sorted.length % 2 ? sorted[meio] : (sorted[meio - 1] + sorted[meio]) / 2;
  },

  desvio(...valores) {
    const m = MathEx.media(...valores);
    const variancia = valores.reduce((acc, v) => acc + (v - m) ** 2, 0) / valores.length;
    return Math.sqrt(variancia);
  }
};

console.log(MathEx.clamp(15, 0, 10));       // 10
console.log(MathEx.lerp(0, 100, 0.5));      // 50
console.log(MathEx.mapear(5, 0, 10, 0, 100)); // 50
console.log(MathEx.media(10, 20, 30));       // 20
console.log(MathEx.mediana(1, 5, 3, 9, 2)); // 3
```
