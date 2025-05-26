# 📘 SISA

Sistema de gerenciamento com múltiplos perfis de usuários: administradores, colaboradores e professores. O objetivo é organizar informações de participantes, atividades (turmas/matérias) e documentos do projeto Brota Vida

---

## 🟢 Backend pronto!

O backend já está rodando e acessível em:  
https://testezinho-8exb.onrender.com

Se você acessar esse endereço e visualizar a mensagem "SISA API is running", significa que o backend está funcionando corretamente.

---

## 🖥️ Próximo passo: rodar o frontend

Agora, basta seguir as instruções abaixo para rodar o frontend localmente e conectar com o backend.

## 📦 Tecnologias utilizadas

### Back-end
- Node.js
- Express
- Sequelize (ORM)
- MySQL
- JWT (autenticação)
- dotenv

### Front-end
- React
- Axios
- React Router
- Vite ou Create React App

---

## 🚀 Como rodar o projeto localmente

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/sisa.git
cd sisa
```

---

### 2. ⚙️ Configuração do Back-end

```bash
cd backend
npm install
```

#### Crie o arquivo `.env`:

```env
DB_HOST=interchange.proxy.rlwy.net
DB_USER=root
DB_PASSWORD=hhFqazJCMYAIkiqxEhkfIpFDgpQUMXYd
DB_NAME=railway
DB_PORT=14848
JWT_SECRET=segredo_super_secreto
```

#### Crie o banco de dados no MySQL:

```sql
CREATE DATABASE sisa;
```

#### Rode o servidor:

```bash
npm start
```

> O back-end estará rodando em: http://localhost:5000

---

### 3. 💻 Configuração do Front-end

```bash
cd ../frontend
npm install
```

#### Crie o arquivo `.env`:

```env
REACT_APP_API=http://localhost:5000/api
```

#### Inicie o servidor de desenvolvimento:

```bash
npm start
```

> O front-end estará disponível em: http://localhost:3000

---

## 👥 Tipos de usuários e permissões

| Tipo de usuário | Permissões principais |
|------------------|------------------------|
| **Administrador** | Total acesso. Cria usuários, gerencia permissões, edita tudo. |
| **Colaborador**   | Visualiza e edita participantes e atividades. Não edita permissões nem documentos padrão. |
| **Professor**     | Apenas visualiza turmas e informações dos participantes. |

---

