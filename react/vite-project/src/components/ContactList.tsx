import { useState } from "react";

interface Contato {
    id: number;
    nome: string;
    email: string;
    phone: string;
}

export default function ContactList() {

    const [contatos, setContatos] = useState<Contato[]>([
        { id: 1, nome: "Lucas Santana", email: "lucas.santan@gmail.com", phone: "(61) 99236-0829" },
        { id: 2, nome: "Jorge Santana", email: "jorge.santan@gmail.com", phone: "(61) 99888-1122" },
    ]);

    const [novoContato, setNovoContato] = useState<Contato>({
        id: 0,
        nome: "",
        email: "",
        phone: "",
    });

    const [editandoId, setEditandoId] = useState<number | null>(null);

    function maskPhone(value: string): string {
        return value
            .replace(/\D/g, "") // remove tudo que não é número
            .replace(/^(\d{2})(\d)/g, "($1) $2") // adiciona parênteses no DDD
            .replace(/(\d{4,5})(\d{4})$/, "$1-$2"); // adiciona o traço
    }

    // Adicionar contato
    function adicionarContato() {
        if (!novoContato.nome || !novoContato.email || !novoContato.phone) {
            alert("Preencha todos os campos!");
            return;
        }

        setContatos([...contatos, { ...novoContato, id: Date.now() }]);
        setNovoContato({ id: 0, nome: "", email: "", phone: "" });
    }

    // Remover contato
    function deletarContato(id: number) {
        setContatos(contatos.filter((c) => c.id !== id));
    }

    // Editar contato
    function editarContato(contato: Contato) {
        setEditandoId(contato.id);
        setNovoContato(contato);
    }

    // Salvar edição
    function salvarEdicao() {
        setContatos(
            contatos.map((c) => (c.id === novoContato.id ? novoContato : c))
        );
        setEditandoId(null);
        setNovoContato({ id: 0, nome: "", email: "", phone: "" });
    }

    return (
        <div className="container mt-4">
            <h2>📇 Lista de Contatos</h2>

            {/* Formulário */}
            <div className="card p-3 mb-4">
                <input
                    type="text"
                    placeholder="Nome"
                    className="form-control mb-2"
                    value={novoContato.nome}
                    onChange={(e) =>
                        setNovoContato({ ...novoContato, nome: e.target.value })
                    }
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="form-control mb-2"
                    value={novoContato.email}
                    onChange={(e) =>
                        setNovoContato({ ...novoContato, email: e.target.value })
                    }
                />
                <input
                    type="text"
                    placeholder="Telefone"
                    className="form-control mb-2"
                    value={novoContato.phone} 
                    onChange={(e) =>
                        setNovoContato({ ...novoContato, phone: maskPhone(e.target.value) })
                    }
                />

                {editandoId ? (<button onClick={salvarEdicao} className="btn btn-success"> Salvar </button>) : (<button onClick={adicionarContato} className="btn btn-primary"> Adicionar </button>)}
            </div>

            {/* Tabela */}
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {contatos.map((contato, index) => (
                        <tr key={contato.id}>
                            <td>{index + 1}</td>
                            <td>{contato.nome}</td>
                            <td>{contato.email}</td>
                            <td>{contato.phone}</td>
                            <td>
                                <button
                                    onClick={() => editarContato(contato)}
                                    className="btn btn-warning btn-sm me-2"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => deletarContato(contato.id)}
                                    className="btn btn-danger btn-sm"
                                >
                                    Remover
                                </button>
                            </td>
                        </tr>
                    ))}
                    {contatos.length === 0 && (
                        <tr>
                            <td colSpan={5} className="text-center">
                                Nenhum contato cadastrado
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
