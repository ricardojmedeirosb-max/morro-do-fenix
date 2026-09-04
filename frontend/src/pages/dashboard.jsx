import React, { useEffect, useMemo, useState } from "react";

/* =========================================================
   MORRO DO FÊNIX — DASHBOARD
   ========================================================= */

const ACTIONS = [
  {
    name: "FAST FOOD",
    category: "Pequena",
    policeMin: 4,
    policeMax: 5,
    criminalsMin: 2,
    criminalsMax: 3,
    weapon: "Apenas Pistolas",
    value: 200000,
    items: "1x Lockpick",
    rules: "Teti-Chão",
  },
  {
    name: "AMMU-NATION",
    category: "Pequena",
    policeMin: 4,
    policeMax: 6,
    criminalsMin: 1,
    criminalsMax: 4,
    weapon: "Apenas Pistolas",
    value: 120000,
    items: "1x Lockpick",
    rules: "Teti-Chão. Somente parte interna da Ammu.",
  },
  {
    name: "MC DONALDS",
    category: "Pequena",
    policeMin: 3,
    policeMax: 4,
    criminalsMin: 2,
    criminalsMax: 3,
    weapon: "Apenas Pistolas",
    value: 200000,
    items: "1x Lockpick",
    rules: "Teti-Chão",
  },
  {
    name: "SKATE",
    category: "Pequena",
    policeMin: 2,
    policeMax: 3,
    criminalsMin: 1,
    criminalsMax: 2,
    weapon: "Apenas Pistolas",
    value: 100000,
    items: "1x Lockpick",
    rules: "Teti-Chão",
  },
  {
    name: "CHINA",
    category: "Pequena",
    policeMin: 6,
    policeMax: 8,
    criminalsMin: 4,
    criminalsMax: 6,
    weapon: "Apenas Pistolas",
    value: 250000,
    items: "1x Lockpick",
    rules: "Teti-Chão",
  },
  {
    name: "COMEDY",
    category: "Pequena",
    policeMin: 6,
    policeMax: 8,
    criminalsMin: 3,
    criminalsMax: 5,
    weapon: "Apenas Pistolas",
    value: 300000,
    items: "1x Lockpick",
    rules: "Teti-Chão",
  },
  {
    name: "FLEECA",
    category: "Pequena",
    policeMin: 6,
    policeMax: 8,
    criminalsMin: 4,
    criminalsMax: 6,
    weapon: "Apenas Pistolas",
    value: 140000,
    items: "1x Lockpick",
    rules: "Teti-Chão",
  },
  {
    name: "COSTUREIRA",
    category: "Pequena",
    policeMin: 5,
    policeMax: 7,
    criminalsMin: 3,
    criminalsMax: 5,
    weapon: "Apenas Pistolas",
    value: 300000,
    items: "1x Lockpick",
    rules: "Teti-Chão",
  },
  {
    name: "OBSERVÁTORIO",
    category: "Pequena",
    policeMin: 11,
    policeMax: 15,
    criminalsMin: 7,
    criminalsMax: 11,
    weapon: "Pistolas ou Sub's",
    value: 800000,
    items: "2x Lockpick",
    rules: "Teti-Chão",
  },
  {
    name: "GALINHEIRO",
    category: "Pequena",
    policeMin: 9,
    policeMax: 13,
    criminalsMin: 6,
    criminalsMax: 10,
    weapon: "Apenas PT's ou Sub's",
    value: 800000,
    items: "1x Lockpick",
    rules: "Teti-Chão. Somente parte interna.",
  },
  {
    name: "AÇOUGUE",
    category: "Pequena",
    policeMin: 8,
    policeMax: 10,
    criminalsMin: 5,
    criminalsMax: 7,
    weapon: "Apenas PT's ou Sub's",
    value: 400000,
    items: "1x Lockpick",
    rules: "Teti-Chão. Somente parte interna.",
  },
  {
    name: "BURGUER SHOT",
    category: "Pequena",
    policeMin: 3,
    policeMax: 4,
    criminalsMin: 1,
    criminalsMax: 2,
    weapon: "Apenas Pistolas",
    value: 120000,
    items: "1x Lockpick",
    rules: "Teti-Chão",
  },
  {
    name: "DEPARTAMENTO POLICIAL",
    category: "Pequena",
    policeMin: 6,
    policeMax: 8,
    criminalsMin: 3,
    criminalsMax: 5,
    weapon: "Apenas Pistolas",
    value: 180000,
    items: "1x Lockpick",
    rules: "Teti-Chão",
  },
  {
    name: "HOTEL ABANDONADO",
    category: "Pequena",
    policeMin: 6,
    policeMax: 7,
    criminalsMin: 4,
    criminalsMax: 5,
    weapon: "Apenas Pistolas",
    value: 220000,
    items: "1x Lockpick",
    rules: "Teti-Chão",
  },
  {
    name: "MERGULHADOR",
    category: "Pequena",
    policeMin: 6,
    policeMax: 8,
    criminalsMin: 3,
    criminalsMax: 5,
    weapon: "Apenas Pistolas",
    value: 200000,
    items: "1x Lockpick",
    rules: "Teti-Chão",
  },
  {
    name: "YELLOW JACK",
    category: "Pequena",
    policeMin: 4,
    policeMax: 6,
    criminalsMin: 2,
    criminalsMax: 4,
    weapon: "Apenas Pistolas",
    value: 120000,
    items: "1x Lockpick",
    rules: "Teti-Chão. Permitido apenas 1 bandido fora.",
  },
  {
    name: "MOTOCLUBE",
    category: "Pequena",
    policeMin: 6,
    policeMax: 8,
    criminalsMin: 3,
    criminalsMax: 5,
    weapon: "Apenas Pistolas",
    value: 300000,
    items: "1x Lockpick",
    rules: "Teti-Chão. Somente dois bandidos na parte interna.",
  },
  {
    name: "GOLF",
    category: "Pequena",
    policeMin: 6,
    policeMax: 8,
    criminalsMin: 4,
    criminalsMax: 6,
    weapon: "Apenas Pistolas",
    value: 200000,
    items: "1x Lockpick",
    rules: "Teti-Chão",
  },
  {
    name: "LOJINHA 6",
    category: "Pequena",
    policeMin: 3,
    policeMax: 5,
    criminalsMin: 1,
    criminalsMax: 3,
    weapon: "Apenas Pistolas",
    value: 160000,
    items: "1x Lockpick",
    rules: "Teti-Chão",
  },

  {
    name: "BANCO CENTRAL",
    category: "Grande",
    policeMin: 13,
    policeMax: 17,
    criminalsMin: 8,
    criminalsMax: 12,
    weapon: "Fuzis + DUAS Remington (12) e UMA Sniper de cada lado",
    value: 3500000,
    items: "3x Pendrive",
    rules: "Proibido utilizar o topo da coroa.",
  },
  {
    name: "BANCO PALETO",
    category: "Grande",
    policeMin: 12,
    policeMax: 16,
    criminalsMin: 8,
    criminalsMax: 12,
    weapon: "Fuzis + DUAS Remington (12) e UMA Sniper de cada lado",
    value: 1250000,
    items: "3x Pendrive",
    rules: "Ação grande.",
  },
  {
    name: "NIÓBIO",
    category: "Grande",
    policeMin: 13,
    policeMax: 18,
    criminalsMin: 6,
    criminalsMax: 11,
    weapon: "Fuzis + DUAS Remington (12) para ambos os lados",
    value: 2300000,
    items: "1x Pendrive",
    rules: "Perímetro restrito à parte interna.",
  },
  {
    name: "AEROPORTO",
    category: "Grande",
    policeMin: 14,
    policeMax: 20,
    criminalsMin: 6,
    criminalsMax: 12,
    weapon: "Submetralhadora",
    value: 2000000,
    items: "1x Pendrive",
    rules: "Não atirar enquanto policiais sobem a escada.",
  },
  {
    name: "CINEMA",
    category: "Grande",
    policeMin: 18,
    policeMax: 24,
    criminalsMin: 12,
    criminalsMax: 18,
    weapon: "Fuzil",
    value: 5000000,
    items: "3x Pendrive",
    rules: "Somente dois bandidos na área da piscina.",
  },
  {
    name: "HOLLYWOOD",
    category: "Grande",
    policeMin: 14,
    policeMax: 18,
    criminalsMin: 8,
    criminalsMax: 12,
    weapon: "Fuzis + DUAS Remington (12) para ambos os lados",
    value: 3500000,
    items: "3x Pendrive",
    rules: "Teti-Chão",
  },
  {
    name: "PORTA-AVIÕES",
    category: "Grande",
    policeMin: 14,
    policeMax: 18,
    criminalsMin: 8,
    criminalsMax: 12,
    weapon: "Fuzis + DUAS Remington (12) para ambos os lados",
    value: 3500000,
    items: "3x Pendrive",
    rules: "Ação grande.",
  },
  {
    name: "JOALHERIA",
    category: "Grande",
    policeMin: 10,
    policeMax: 12,
    criminalsMin: 7,
    criminalsMax: 9,
    weapon: "Fuzis + DUAS Remington (12) para ambos os lados",
    value: 2300000,
    items: "2x Pendrive",
    rules: "Permitido até dois helicópteros.",
  },
];

const PRODUCTS = [
  "Algemas",
  "Pendrive",
  "Colete",
  "Lockpick",
  "Mochila Reforçada",
  "Ticket",
];

const emptyForm = {
  leader: "",
  action: "",
};

function money(value) {
  return Number(value || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function today() {
  return new Date().toLocaleDateString("pt-BR");
}

function load(key, fallback = []) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getCurrentUser() {
  try {
    const raw =
      localStorage.getItem("morro_fenix_usuario") ||
      localStorage.getItem("usuario") ||
      localStorage.getItem("user");

    if (!raw) return {};

    const usuario = JSON.parse(raw);

    return {
      ...usuario,
      nome:
        usuario?.nome ||
        usuario?.nome_completo ||
        "Usuário",
      cargo: String(
        usuario?.cargo ||
        usuario?.role ||
        usuario?.perfil ||
        usuario?.tipo ||
        "MEMBRO"
      ).trim().toUpperCase(),
    };
  } catch {
    return {};
  }
}

function Badge({ children, type = "gold" }) {
  return <span className={`badge badge-${type}`}>{children}</span>;
}

function SectionTitle({ title, subtitle }) {
  return (
    <div className="section-title">
      <div>
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </div>
  );
}

function Dashboard() {
  const [user, setUser] = useState(() => getCurrentUser());

  // O banco/API é a fonte oficial do cargo. O localStorage serve apenas
  // como cache para evitar que um cargo antigo (ex.: MEMBRO) fique preso.
  useEffect(() => {
    const token = localStorage.getItem("morro_fenix_token");
    if (!token) return;

    const API_URL = (import.meta.env.VITE_API_URL || "https://morro-do-fenix-edz2.vercel.app").replace(/\/+$/, "");

    fetch(`${API_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        const dados = await res.json().catch(() => ({}));
        if (!res.ok || !dados.sucesso || !dados.usuario) {
          throw new Error(dados.mensagem || "Sessão inválida.");
        }
        return dados.usuario;
      })
      .then((usuarioApi) => {
        const usuarioAtual = {
          ...usuarioApi,
          nome: usuarioApi.nome || usuarioApi.nome_completo || "Usuário",
          nome_completo: usuarioApi.nome_completo || usuarioApi.nome || "Usuário",
          cargo: String(usuarioApi.cargo || "MEMBRO").trim().toUpperCase(),
        };

        setUser(usuarioAtual);
        localStorage.setItem("morro_fenix_usuario", JSON.stringify(usuarioAtual));
      })
      .catch((error) => {
        console.error("Erro ao atualizar sessão:", error);
      });
  }, []);

  const role = String(user?.cargo || "MEMBRO")
    .trim()
    .toUpperCase();

  const isSuperAdmin = role === "SUPER_ADMIN";

  const isManager =
    role === "GERENTE" ||
    isSuperAdmin;

  const isLeader =
    role === "LIDER" ||
    isManager;

  const [activeTab, setActiveTab] = useState(
    isManager ? "inicio" : "membros"
  );

  const [actions, setActions] = useState(() =>
    load("morro_fenix_acoes_registradas")
  );

  const [sales, setSales] = useState(() =>
    load("morro_fenix_vendas")
  );

  const [orders, setOrders] = useState(() =>
    load("morro_fenix_encomendas")
  );

  const [adv, setAdv] = useState(() =>
    load("morro_fenix_adv")
  );

  const [wash, setWash] = useState(() =>
    load("morro_fenix_lavagens")
  );

  const [recruitments, setRecruitments] = useState(() =>
    load("morro_fenix_recrutamentos")
  );

  const [absences, setAbsences] = useState(() =>
    load("morro_fenix_ausencias")
  );

  const [members, setMembers] = useState(() =>
    load("morro_fenix_membros")
  );

  const [records, setRecords] = useState(() =>
    load("morro_fenix_registros")
  );

  const [actionForm, setActionForm] = useState(emptyForm);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [saleForm, setSaleForm] = useState({
    seller: user?.nome || "",
    items: [],
    quantity: 1,
    notes: "",
  });

  const [orderForm, setOrderForm] = useState({
    requester: user?.nome || "",
    items: [],
    delivery: "",
    notes: "",
  });

  const [advForm, setAdvForm] = useState({
    member: "",
    levels: [],
    reason: "",
  });

  const [washForm, setWashForm] = useState({
    client: "",
    id: "",
    value: "",
    partnership: "nao",
    responsible: user?.nome || "",
    proof: "",
  });

  const [recruitForm, setRecruitForm] = useState({
    name: "",
    id: "",
    discord: "",
    responsible: user?.nome || "",
  });

  const [absenceForm, setAbsenceForm] = useState({
    member: user?.nome || "",
    date: "",
    reason: "",
  });

  const [notice, setNotice] = useState("");

  useEffect(() => {
    save("morro_fenix_acoes_registradas", actions);
  }, [actions]);

  useEffect(() => {
    save("morro_fenix_vendas", sales);
  }, [sales]);

  useEffect(() => {
    save("morro_fenix_encomendas", orders);
  }, [orders]);

  useEffect(() => {
    save("morro_fenix_adv", adv);
  }, [adv]);

  useEffect(() => {
    save("morro_fenix_lavagens", wash);
  }, [wash]);

  useEffect(() => {
    save("morro_fenix_recrutamentos", recruitments);
  }, [recruitments]);

  useEffect(() => {
    save("morro_fenix_ausencias", absences);
  }, [absences]);

  useEffect(() => {
    save("morro_fenix_membros", members);
  }, [members]);

  useEffect(() => {
    save("morro_fenix_registros", records);
  }, [records]);

  function notify(message) {
    setNotice(message);
    setTimeout(() => setNotice(""), 3000);
  }

  function registerRecord(type, data) {
    setRecords((old) => [
      {
        id: Date.now(),
        type,
        date: today(),
        author: user?.nome || "Sistema",
        ...data,
      },
      ...old,
    ]);
  }

  function registerAction(e) {
    e.preventDefault();

    if (!actionForm.leader || !actionForm.action) {
      notify("Preencha o líder e selecione uma ação.");
      return;
    }

    const info = ACTIONS.find(
      (item) => item.name === actionForm.action
    );

    const newAction = {
      id: Date.now(),
      leader: actionForm.leader,
      action: info.name,
      category: info.category,
      policeMin: info.policeMin,
      policeMax: info.policeMax,
      criminalsMin: info.criminalsMin,
      criminalsMax: info.criminalsMax,
      weapon: info.weapon,
      value: info.value,
      items: info.items,
      rules: info.rules,
      participants: [],
      status: "ABERTA",
      date: today(),
    };

    setActions((old) => [newAction, ...old]);
    registerRecord("AÇÃO", newAction);
    setActionForm(emptyForm);
    notify("Ação registrada.");
  }

  function toggleActionParticipant(actionId) {
    const currentName = user?.nome || "Membro";

    setActions((old) =>
      old.map((item) => {
        if (item.id !== actionId) return item;

        const already = item.participants.includes(currentName);

        if (already) {
          return {
            ...item,
            participants: item.participants.filter(
              (name) => name !== currentName
            ),
          };
        }

        const max = item.criminalsMax;

        if (item.participants.length >= max) {
          notify("O limite máximo de membros dessa ação foi atingido.");
          return item;
        }

        return {
          ...item,
          participants: [...item.participants, currentName],
        };
      })
    );
  }

  function toggleProduct(product, setter, current) {
    if (current.includes(product)) {
      setter(current.filter((item) => item !== product));
    } else {
      setter([...current, product]);
    }
  }

  function registerSale(e) {
    e.preventDefault();

    if (!saleForm.seller || saleForm.items.length === 0) {
      notify("Selecione pelo menos um produto.");
      return;
    }

    const item = {
      id: Date.now(),
      seller: saleForm.seller,
      items: saleForm.items,
      quantity: Number(saleForm.quantity),
      notes: saleForm.notes,
      date: today(),
      status: "REGISTRADA",
    };

    setSales((old) => [item, ...old]);
    registerRecord("VENDA", item);

    setSaleForm({
      seller: user?.nome || "",
      items: [],
      quantity: 1,
      notes: "",
    });

    notify("Venda registrada.");
  }

  function registerOrder(e) {
    e.preventDefault();

    if (!orderForm.requester || orderForm.items.length === 0) {
      notify("Preencha o solicitante e selecione os produtos.");
      return;
    }

    if (!orderForm.delivery) {
      notify("Informe a data de entrega.");
      return;
    }

    const item = {
      id: Date.now(),
      requester: orderForm.requester,
      items: orderForm.items,
      delivery: orderForm.delivery,
      notes: orderForm.notes,
      date: today(),
      status: "PENDENTE",
    };

    setOrders((old) => [item, ...old]);
    registerRecord("ENCOMENDA", item);

    setOrderForm({
      requester: user?.nome || "",
      items: [],
      delivery: "",
      notes: "",
    });

    notify("Encomenda registrada.");
  }

  function registerAdv(e) {
    e.preventDefault();

    if (!advForm.member || advForm.levels.length === 0) {
      notify("Selecione o membro e pelo menos um ADV.");
      return;
    }

    const item = {
      id: Date.now(),
      member: advForm.member,
      levels: advForm.levels,
      reason: advForm.reason,
      date: today(),
      responsible: user?.nome || "Gerente",
    };

    setAdv((old) => [item, ...old]);
    registerRecord("ADV / REBAIXAMENTO", item);

    setAdvForm({
      member: "",
      levels: [],
      reason: "",
    });

    notify("Registro de ADV salvo.");
  }

  function registerWash(e) {
    e.preventDefault();

    const value = Number(
      String(washForm.value).replace(/\./g, "").replace(",", ".")
    );

    if (!washForm.client || !value || !washForm.responsible) {
      notify("Preencha os dados da lavagem.");
      return;
    }

    const percentage = washForm.partnership === "sim" ? 20 : 30;
    const facValue = value * (percentage / 100);
    const remaining = value - facValue;

    const item = {
      id: Date.now(),
      client: washForm.client,
      clientId: washForm.id,
      value,
      partnership: washForm.partnership === "sim",
      percentage,
      facValue,
      remaining,
      responsible: washForm.responsible,
      proof: washForm.proof,
      date: today(),
      status: "PENDENTE",
    };

    setWash((old) => [item, ...old]);
    registerRecord("LAVAGEM CLIENTE", item);

    setWashForm({
      client: "",
      id: "",
      value: "",
      partnership: "nao",
      responsible: user?.nome || "",
      proof: "",
    });

    notify("Lavagem registrada.");
  }

  function registerRecruitment(e) {
    e.preventDefault();

    if (!recruitForm.name || !recruitForm.id) {
      notify("Preencha nome e ID.");
      return;
    }

    const item = {
      id: Date.now(),
      name: recruitForm.name,
      memberId: recruitForm.id,
      discord: recruitForm.discord,
      responsible: recruitForm.responsible,
      date: today(),
      status: "PENDENTE",
    };

    setRecruitments((old) => [item, ...old]);
    registerRecord("RECRUTAMENTO", item);

    setRecruitForm({
      name: "",
      id: "",
      discord: "",
      responsible: user?.nome || "",
    });

    notify("Recrutamento registrado.");
  }

  function registerAbsence(e) {
    e.preventDefault();

    if (!absenceForm.member || !absenceForm.date) {
      notify("Informe membro e data.");
      return;
    }

    const item = {
      id: Date.now(),
      member: absenceForm.member,
      dateAbsence: absenceForm.date,
      reason: absenceForm.reason,
      created: today(),
    };

    setAbsences((old) => [item, ...old]);
    registerRecord("AUSÊNCIA", item);

    setAbsenceForm({
      member: user?.nome || "",
      date: "",
      reason: "",
    });

    notify("Ausência registrada.");
  }

  const rankings = useMemo(() => {
    const recruitmentMap = {};
    const salesMap = {};
    const actionMap = {};
    const washMap = {};

    recruitments.forEach((item) => {
      const key = item.responsible || "Desconhecido";
      recruitmentMap[key] = (recruitmentMap[key] || 0) + 1;
    });

    sales.forEach((item) => {
      const key = item.seller || "Desconhecido";
      salesMap[key] =
        (salesMap[key] || 0) + Number(item.quantity || 1);
    });

    actions.forEach((item) => {
      (item.participants || []).forEach((member) => {
        actionMap[member] = (actionMap[member] || 0) + 1;
      });
    });

    wash.forEach((item) => {
      const key = item.responsible || "Desconhecido";
      washMap[key] = (washMap[key] || 0) + 1;
    });

    const sort = (map) =>
      Object.entries(map)
        .map(([name, points]) => ({ name, points }))
        .sort((a, b) => b.points - a.points);

    return {
      recruitment: sort(recruitmentMap),
      sales: sort(salesMap),
      actions: sort(actionMap),
      wash: sort(washMap),
    };
  }, [recruitments, sales, actions, wash]);

  const registeredActions = actions;

  const menu = [
    ...(isManager
      ? [
          { id: "inicio", label: "Visão Geral", icon: "⌂" },
          { id: "registrar-acao", label: "Registrar Ação", icon: "＋" },
          { id: "vendas", label: "Vendas", icon: "◈" },
          { id: "encomendas", label: "Encomendas", icon: "▣" },
          { id: "adv", label: "ADV / Rebaixamento", icon: "!" },
          { id: "lavagem", label: "Lavagem Cliente", icon: "◆" },
          { id: "recrutamento", label: "Recrutamento", icon: "♙" },
          { id: "registros", label: "Registros", icon: "☷" },
        ]
      : []),

    { id: "acoes", label: "Ações", icon: "⚔" },
    { id: "membros", label: "Membros", icon: "♟" },
    { id: "rankings", label: "Rankings", icon: "★" },

    ...(!isManager
      ? [{ id: "ausencia", label: "Ausência", icon: "◷" }]
      : []),

    ...(isLeader
      ? [{ id: "lider", label: "Painel do Líder", icon: "♛" }]
      : []),

    ...(isManager
      ? [{ id: "gerente", label: "Painel Gerente", icon: "◆" }]
      : []),
  ];

  function renderProductSelector(items, setter, current) {
    return (
      <div className="product-grid">
        {PRODUCTS.map((product) => {
          const selected = current.includes(product);

          return (
            <button
              type="button"
              key={product}
              className={`product-button ${
                selected ? "selected" : ""
              }`}
              onClick={() =>
                toggleProduct(product, setter, current)
              }
            >
              <span>{selected ? "✓" : "+"}</span>
              {product}
            </button>
          );
        })}
      </div>
    );
  }

  function renderInicio() {
    return (
      <>
        <SectionTitle
          title="Visão Geral"
          subtitle="Painel administrativo do Morro do Fênix"
        />

        <div className="stats-grid">
          <div className="stat-card">
            <span>Ações registradas</span>
            <strong>{actions.length}</strong>
            <small>Ações atualmente cadastradas</small>
          </div>

          <div className="stat-card">
            <span>Vendas</span>
            <strong>{sales.length}</strong>
            <small>Registros de vendas</small>
          </div>

          <div className="stat-card">
            <span>Encomendas</span>
            <strong>{orders.length}</strong>
            <small>Pedidos cadastrados</small>
          </div>

          <div className="stat-card">
            <span>Lavagens</span>
            <strong>{wash.length}</strong>
            <small>Lavagens registradas</small>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="panel-card">
            <h3>Atividade recente</h3>

            {records.length === 0 ? (
              <div className="empty">
                Nenhum registro realizado ainda.
              </div>
            ) : (
              records.slice(0, 6).map((item) => (
                <div className="activity" key={item.id}>
                  <div>
                    <strong>{item.type}</strong>
                    <span>{item.author}</span>
                  </div>
                  <small>{item.date}</small>
                </div>
              ))
            )}
          </div>

          <div className="panel-card">
            <h3>Ações abertas</h3>

            {actions.length === 0 ? (
              <div className="empty">
                Nenhuma ação foi registrada.
              </div>
            ) : (
              actions.slice(0, 5).map((item) => (
                <div className="mini-action" key={item.id}>
                  <div>
                    <strong>{item.action}</strong>
                    <span>Líder: {item.leader}</span>
                  </div>

                  <Badge>
                    {item.participants?.length || 0}/
                    {item.criminalsMax}
                  </Badge>
                </div>
              ))
            )}
          </div>
        </div>
      </>
    );
  }

  function renderRegistrarAcao() {
    return (
      <>
        <SectionTitle
          title="Registrar Ação"
          subtitle="Cadastre uma ação para que ela apareça no painel dos membros."
        />

        <div className="form-card">
          <form onSubmit={registerAction}>
            <div className="form-grid">
              <label>
                Nome do líder
                <input
                  value={actionForm.leader}
                  onChange={(e) =>
                    setActionForm({
                      ...actionForm,
                      leader: e.target.value,
                    })
                  }
                  placeholder="Nome do líder"
                />
              </label>

              <label>
                Ação
                <select
                  value={actionForm.action}
                  onChange={(e) =>
                    setActionForm({
                      ...actionForm,
                      action: e.target.value,
                    })
                  }
                >
                  <option value="">Selecione uma ação</option>

                  <optgroup label="Ações Pequenas">
                    {ACTIONS.filter(
                      (a) => a.category === "Pequena"
                    ).map((a) => (
                      <option key={a.name} value={a.name}>
                        {a.name}
                      </option>
                    ))}
                  </optgroup>

                  <optgroup label="Ações Grandes">
                    {ACTIONS.filter(
                      (a) => a.category === "Grande"
                    ).map((a) => (
                      <option key={a.name} value={a.name}>
                        {a.name}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </label>
            </div>

            {actionForm.action && (
              <div className="selected-action">
                {(() => {
                  const a = ACTIONS.find(
                    (x) => x.name === actionForm.action
                  );

                  return (
                    <>
                      <div className="action-header">
                        <div>
                          <Badge>{a.category}</Badge>
                          <h3>{a.name}</h3>
                        </div>

                        <strong>{money(a.value)}</strong>
                      </div>

                      <div className="info-grid">
                        <div>
                          <span>Bandidos</span>
                          <strong>
                            {a.criminalsMin}–{a.criminalsMax}
                          </strong>
                        </div>

                        <div>
                          <span>Policiais</span>
                          <strong>
                            {a.policeMin}–{a.policeMax}
                          </strong>
                        </div>

                        <div>
                          <span>Armamento</span>
                          <strong>{a.weapon}</strong>
                        </div>

                        <div>
                          <span>Itens</span>
                          <strong>{a.items}</strong>
                        </div>

                        <div className="full">
                          <span>Descrição / regras</span>
                          <strong>{a.rules}</strong>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            )}

            <button className="gold-button" type="submit">
              Registrar ação
            </button>
          </form>
        </div>
      </>
    );
  }

  function renderAcoes() {
    return (
      <>
        <SectionTitle
          title="Ações"
          subtitle="Somente ações registradas pelos responsáveis aparecem aqui."
        />

        {registeredActions.length === 0 ? (
          <div className="empty large">
            <div className="empty-icon">⚔</div>
            <h3>Nenhuma ação aberta</h3>
            <p>
              Quando um gerente registrar uma ação, ela aparecerá
              automaticamente aqui.
            </p>
          </div>
        ) : (
          <div className="action-list">
            {registeredActions.map((item) => {
              const participating = (
                item.participants || []
              ).includes(user?.nome || "Membro");

              const full =
                (item.participants?.length || 0) >=
                item.criminalsMax;

              return (
                <div className="action-card" key={item.id}>
                  <div className="action-top">
                    <div>
                      <Badge>{item.category}</Badge>
                      <h3>{item.action}</h3>
                      <span>
                        Líder: <b>{item.leader}</b>
                      </span>
                    </div>

                    <div className="action-value">
                      {money(item.value)}
                    </div>
                  </div>

                  <div className="info-grid">
                    <div>
                      <span>Membros</span>
                      <strong>
                        {item.participants?.length || 0}/
                        {item.criminalsMax}
                      </strong>
                    </div>

                    <div>
                      <span>Limite</span>
                      <strong>
                        {item.criminalsMin}–{item.criminalsMax}
                      </strong>
                    </div>

                    <div>
                      <span>Armamento</span>
                      <strong>{item.weapon}</strong>
                    </div>

                    <div>
                      <span>Itens</span>
                      <strong>{item.items}</strong>
                    </div>

                    <div className="full">
                      <span>Descrição</span>
                      <strong>{item.rules}</strong>
                    </div>
                  </div>

                  <div className="participants">
                    <span>Participantes</span>

                    {item.participants?.length ? (
                      <div className="participant-list">
                        {item.participants.map((name) => (
                          <Badge key={name} type="dark">
                            {name}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <small>Ninguém participou ainda.</small>
                    )}
                  </div>

                  <button
                    className={
                      participating
                        ? "danger-button"
                        : "gold-button"
                    }
                    disabled={!participating && full}
                    onClick={() =>
                      toggleActionParticipant(item.id)
                    }
                  >
                    {participating
                      ? "Sair da ação"
                      : full
                      ? "Ação lotada"
                      : "Participar da ação"}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </>
    );
  }

  function renderVendas() {
    return (
      <>
        <SectionTitle
          title="Registro de Vendas"
          subtitle="É possível selecionar vários produtos na mesma venda."
        />

        <div className="form-card">
          <form onSubmit={registerSale}>
            <div className="form-grid">
              <label>
                Vendedor
                <input
                  value={saleForm.seller}
                  onChange={(e) =>
                    setSaleForm({
                      ...saleForm,
                      seller: e.target.value,
                    })
                  }
                  placeholder="Nome do vendedor"
                />
              </label>

              <label>
                Quantidade
                <input
                  type="number"
                  min="1"
                  value={saleForm.quantity}
                  onChange={(e) =>
                    setSaleForm({
                      ...saleForm,
                      quantity: e.target.value,
                    })
                  }
                />
              </label>
            </div>

            <div className="field-title">
              Produtos — selecione quantos quiser
            </div>

            {renderProductSelector(
              PRODUCTS,
              (value) =>
                setSaleForm({
                  ...saleForm,
                  items: value,
                }),
              saleForm.items
            )}

            <label>
              Observações
              <textarea
                value={saleForm.notes}
                onChange={(e) =>
                  setSaleForm({
                    ...saleForm,
                    notes: e.target.value,
                  })
                }
                placeholder="Observações da venda"
              />
            </label>

            <button className="gold-button">
              Registrar venda
            </button>
          </form>
        </div>

        <RecordsTable
          title="Vendas registradas"
          data={sales}
          empty="Nenhuma venda registrada."
          render={(item) => (
            <>
              <b>{item.seller}</b>
              <span>{item.items.join(", ")}</span>
              <small>
                Qtd: {item.quantity} • {item.date}
              </small>
            </>
          )}
        />
      </>
    );
  }

  function renderEncomendas() {
    return (
      <>
        <SectionTitle
          title="Registro de Encomendas"
          subtitle="Selecione vários itens e defina a data de entrega."
        />

        <div className="form-card">
          <form onSubmit={registerOrder}>
            <div className="form-grid">
              <label>
                Solicitante
                <input
                  value={orderForm.requester}
                  onChange={(e) =>
                    setOrderForm({
                      ...orderForm,
                      requester: e.target.value,
                    })
                  }
                />
              </label>

              <label>
                Data de entrega
                <input
                  type="date"
                  value={orderForm.delivery}
                  onChange={(e) =>
                    setOrderForm({
                      ...orderForm,
                      delivery: e.target.value,
                    })
                  }
                />
              </label>
            </div>

            <div className="field-title">
              Produtos — seleção múltipla
            </div>

            {renderProductSelector(
              PRODUCTS,
              (value) =>
                setOrderForm({
                  ...orderForm,
                  items: value,
                }),
              orderForm.items
            )}

            <label>
              Observações
              <textarea
                value={orderForm.notes}
                onChange={(e) =>
                  setOrderForm({
                    ...orderForm,
                    notes: e.target.value,
                  })
                }
              />
            </label>

            <button className="gold-button">
              Registrar encomenda
            </button>
          </form>
        </div>

        <RecordsTable
          title="Encomendas"
          data={orders}
          empty="Nenhuma encomenda registrada."
          render={(item) => (
            <>
              <b>{item.requester}</b>
              <span>{item.items.join(", ")}</span>
              <small>
                Entrega: {item.delivery} • Registrada: {item.date}
              </small>
            </>
          )}
        />
      </>
    );
  }

  function renderAdv() {
    return (
      <>
        <SectionTitle
          title="ADV / Rebaixamento"
          subtitle="É possível selecionar ADV 1, ADV 2 e ADV 3."
        />

        <div className="form-card">
          <form onSubmit={registerAdv}>
            <label>
              Membro
              <input
                value={advForm.member}
                onChange={(e) =>
                  setAdvForm({
                    ...advForm,
                    member: e.target.value,
                  })
                }
                placeholder="Nome ou ID do membro"
              />
            </label>

            <div className="field-title">Níveis</div>

            <div className="adv-grid">
              {["ADV 1", "ADV 2", "ADV 3"].map((level) => {
                const selected =
                  advForm.levels.includes(level);

                return (
                  <button
                    type="button"
                    key={level}
                    className={`adv-button ${
                      selected ? "selected" : ""
                    }`}
                    onClick={() =>
                      setAdvForm({
                        ...advForm,
                        levels: selected
                          ? advForm.levels.filter(
                              (x) => x !== level
                            )
                          : [...advForm.levels, level],
                      })
                    }
                  >
                    {selected ? "✓ " : ""}
                    {level}
                  </button>
                );
              })}
            </div>

            <label>
              Motivo
              <textarea
                value={advForm.reason}
                onChange={(e) =>
                  setAdvForm({
                    ...advForm,
                    reason: e.target.value,
                  })
                }
                placeholder="Motivo do ADV/rebaixamento"
              />
            </label>

            <button className="gold-button">
              Registrar ADV
            </button>
          </form>
        </div>

        <RecordsTable
          title="Registros de ADV"
          data={adv}
          empty="Nenhum ADV registrado."
          render={(item) => (
            <>
              <b>{item.member}</b>
              <span>{item.levels.join(", ")}</span>
              <small>
                {item.reason || "Sem motivo informado"} •{" "}
                {item.date}
              </small>
            </>
          )}
        />
      </>
    );
  }

  function renderLavagem() {
    return (
      <>
        <SectionTitle
          title="Lavagem Cliente"
          subtitle="Registre parceria, valor, percentual da facção e comprovante."
        />

        <div className="form-card">
          <form onSubmit={registerWash}>
            <div className="form-grid">
              <label>
                Cliente
                <input
                  value={washForm.client}
                  onChange={(e) =>
                    setWashForm({
                      ...washForm,
                      client: e.target.value,
                    })
                  }
                />
              </label>

              <label>
                ID
                <input
                  value={washForm.id}
                  onChange={(e) =>
                    setWashForm({
                      ...washForm,
                      id: e.target.value,
                    })
                  }
                />
              </label>

              <label>
                Valor da lavagem
                <input
                  value={washForm.value}
                  onChange={(e) =>
                    setWashForm({
                      ...washForm,
                      value: e.target.value,
                    })
                  }
                  placeholder="100000"
                />
              </label>

              <label>
                Responsável
                <input
                  value={washForm.responsible}
                  onChange={(e) =>
                    setWashForm({
                      ...washForm,
                      responsible: e.target.value,
                    })
                  }
                />
              </label>
            </div>

            <div className="field-title">
              A lavagem possui parceria?
            </div>

            <div className="choice-grid">
              <button
                type="button"
                className={
                  washForm.partnership === "sim"
                    ? "choice selected"
                    : "choice"
                }
                onClick={() =>
                  setWashForm({
                    ...washForm,
                    partnership: "sim",
                  })
                }
              >
                SIM — 20% FAC
              </button>

              <button
                type="button"
                className={
                  washForm.partnership === "nao"
                    ? "choice selected"
                    : "choice"
                }
                onClick={() =>
                  setWashForm({
                    ...washForm,
                    partnership: "nao",
                  })
                }
              >
                NÃO — 30% FAC
              </button>
            </div>

            {washForm.value && (
              <div className="wash-preview">
                {(() => {
                  const value = Number(
                    String(washForm.value)
                      .replace(/\./g, "")
                      .replace(",", ".")
                  );

                  const percent =
                    washForm.partnership === "sim" ? 20 : 30;

                  const fac = value * (percent / 100);

                  return (
                    <>
                      <div>
                        <span>Percentual FAC</span>
                        <strong>{percent}%</strong>
                      </div>

                      <div>
                        <span>Valor FAC</span>
                        <strong>{money(fac)}</strong>
                      </div>

                      <div>
                        <span>Valor restante</span>
                        <strong>{money(value - fac)}</strong>
                      </div>
                    </>
                  );
                })()}
              </div>
            )}

            <label>
              Comprovante / print
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setWashForm({
                    ...washForm,
                    proof:
                      e.target.files?.[0]?.name || "",
                  })
                }
              />
              {washForm.proof && (
                <small className="file-name">
                  Arquivo: {washForm.proof}
                </small>
              )}
            </label>

            <button className="gold-button">
              Registrar lavagem
            </button>
          </form>
        </div>

        <div className="records-list">
          <h3>Registros de Lavagem</h3>

          {wash.length === 0 ? (
            <div className="empty">
              Nenhuma lavagem registrada.
            </div>
          ) : (
            wash.map((item) => (
              <div className="wash-record" key={item.id}>
                <div className="record-head">
                  <div>
                    <Badge>LAVAGEM CLIENTE</Badge>
                    <h3>{item.client}</h3>
                  </div>

                  <Badge
                    type={
                      item.status === "PENDENTE"
                        ? "warning"
                        : "gold"
                    }
                  >
                    {item.status}
                  </Badge>
                </div>

                <div className="wash-data">
                  <div>
                    <span>ID</span>
                    <b>{item.clientId || "-"}</b>
                  </div>

                  <div>
                    <span>Valor</span>
                    <b>{money(item.value)}</b>
                  </div>

                  <div>
                    <span>Parceria</span>
                    <b>
                      {item.partnership ? "SIM" : "NÃO"}
                    </b>
                  </div>

                  <div>
                    <span>Percentual FAC</span>
                    <b>{item.percentage}%</b>
                  </div>

                  <div>
                    <span>Valor FAC</span>
                    <b>{money(item.facValue)}</b>
                  </div>

                  <div>
                    <span>Valor restante</span>
                    <b>{money(item.remaining)}</b>
                  </div>

                  <div>
                    <span>Responsável</span>
                    <b>{item.responsible}</b>
                  </div>

                  <div>
                    <span>Data</span>
                    <b>{item.date}</b>
                  </div>
                </div>

                <div className="proof">
                  <span>Comprovante</span>
                  <b>
                    {item.proof
                      ? `📎 ${item.proof}`
                      : "Nenhum comprovante informado"}
                  </b>
                </div>
              </div>
            ))
          )}
        </div>
      </>
    );
  }

  function renderRecrutamento() {
    return (
      <>
        <SectionTitle
          title="Recrutamento"
          subtitle="Registro de novos membros."
        />

        <div className="form-card">
          <form onSubmit={registerRecruitment}>
            <div className="form-grid">
              <label>
                Nome
                <input
                  value={recruitForm.name}
                  onChange={(e) =>
                    setRecruitForm({
                      ...recruitForm,
                      name: e.target.value,
                    })
                  }
                />
              </label>

              <label>
                ID
                <input
                  value={recruitForm.id}
                  onChange={(e) =>
                    setRecruitForm({
                      ...recruitForm,
                      id: e.target.value,
                    })
                  }
                />
              </label>

              <label>
                Discord
                <input
                  value={recruitForm.discord}
                  onChange={(e) =>
                    setRecruitForm({
                      ...recruitForm,
                      discord: e.target.value,
                    })
                  }
                />
              </label>

              <label>
                Responsável
                <input
                  value={recruitForm.responsible}
                  onChange={(e) =>
                    setRecruitForm({
                      ...recruitForm,
                      responsible: e.target.value,
                    })
                  }
                />
              </label>
            </div>

            <button className="gold-button">
              Registrar recrutamento
            </button>
          </form>
        </div>

        <RecordsTable
          title="Recrutamentos"
          data={recruitments}
          empty="Nenhum recrutamento registrado."
          render={(item) => (
            <>
              <b>{item.name}</b>
              <span>
                ID: {item.memberId} • Discord:{" "}
                {item.discord || "-"}
              </span>
              <small>
                Responsável: {item.responsible} • {item.date}
              </small>
            </>
          )}
        />
      </>
    );
  }

  function renderRegistros() {
    return (
      <>
        <SectionTitle
          title="Registros"
          subtitle="Histórico geral das atividades."
        />

        <div className="records-list">
          {records.length === 0 ? (
            <div className="empty large">
              Nenhum registro disponível.
            </div>
          ) : (
            records.map((item) => (
              <div className="record-row" key={item.id}>
                <div>
                  <Badge>{item.type}</Badge>
                  <h3>
                    {item.action ||
                      item.client ||
                      item.member ||
                      item.name ||
                      item.seller ||
                      item.requester ||
                      "Registro"}
                  </h3>
                </div>

                <div>
                  <span>Responsável</span>
                  <b>{item.author || item.responsible}</b>
                </div>

                <div>
                  <span>Data</span>
                  <b>{item.date}</b>
                </div>
              </div>
            ))
          )}
        </div>
      </>
    );
  }

  function renderMembros() {
    return (
      <>
        <SectionTitle
          title="Área dos Membros"
          subtitle="Participação em ações e registro de ausência."
        />

        <div className="member-hero">
          <div className="avatar">
            {(user?.nome || "M").charAt(0).toUpperCase()}
          </div>

          <div>
            <span>MEMBRO</span>
            <h2>{user?.nome || "Membro"}</h2>
            <p>
              {user?.id ? `ID: ${user.id}` : "Área do membro"}
            </p>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="panel-card">
            <h3>Minhas ações</h3>

            {actions.filter((a) =>
              (a.participants || []).includes(
                user?.nome || "Membro"
              )
            ).length === 0 ? (
              <div className="empty">
                Você ainda não está participando de nenhuma ação.
              </div>
            ) : (
              actions
                .filter((a) =>
                  (a.participants || []).includes(
                    user?.nome || "Membro"
                  )
                )
                .map((a) => (
                  <div className="activity" key={a.id}>
                    <div>
                      <strong>{a.action}</strong>
                      <span>Líder: {a.leader}</span>
                    </div>

                    <Badge>
                      {a.participants.length}/
                      {a.criminalsMax}
                    </Badge>
                  </div>
                ))
            )}
          </div>

          <div className="panel-card">
            <h3>Registrar ausência</h3>

            <form onSubmit={registerAbsence}>
              <label>
                Data
                <input
                  type="date"
                  value={absenceForm.date}
                  onChange={(e) =>
                    setAbsenceForm({
                      ...absenceForm,
                      date: e.target.value,
                    })
                  }
                />
              </label>

              <label>
                Motivo
                <textarea
                  value={absenceForm.reason}
                  onChange={(e) =>
                    setAbsenceForm({
                      ...absenceForm,
                      reason: e.target.value,
                    })
                  }
                />
              </label>

              <button className="gold-button">
                Registrar ausência
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }

  function renderRankings() {
    const ranking = (title, data, suffix = "") => (
      <div className="ranking-card">
        <div className="ranking-title">
          <span>★</span>
          <h3>{title}</h3>
        </div>

        {data.length === 0 ? (
          <div className="empty">
            Ainda não existem dados suficientes.
          </div>
        ) : (
          data.slice(0, 10).map((item, index) => (
            <div className="ranking-row" key={item.name}>
              <div className="position">
                #{index + 1}
              </div>

              <div className="rank-name">
                <strong>{item.name}</strong>
                <small>
                  {item.points} {suffix}
                </small>
              </div>

              <div className="points">
                {item.points}
              </div>
            </div>
          ))
        )}
      </div>
    );

    return (
      <>
        <SectionTitle
          title="Rankings"
          subtitle="Desempenho por categoria."
        />

        <div className="ranking-grid">
          {ranking(
            "Ranking de Recrutamento",
            rankings.recruitment,
            "recrutamentos"
          )}

          {ranking(
            "Ranking de Vendas",
            rankings.sales,
            "vendas"
          )}

          {ranking(
            "Ranking de Ações",
            rankings.actions,
            "ações"
          )}

          {ranking(
            "Ranking de Lavagem",
            rankings.wash,
            "lavagens"
          )}
        </div>
      </>
    );
  }

  function renderLider() {
    return (
      <>
        <SectionTitle
          title="Painel do Líder"
          subtitle="Acompanhamento das atividades da equipe."
        />

        <div className="stats-grid">
          <div className="stat-card">
            <span>Ações abertas</span>
            <strong>{actions.length}</strong>
          </div>

          <div className="stat-card">
            <span>Participantes</span>
            <strong>
              {actions.reduce(
                (total, a) =>
                  total + (a.participants?.length || 0),
                0
              )}
            </strong>
          </div>

          <div className="stat-card">
            <span>Vendas</span>
            <strong>{sales.length}</strong>
          </div>

          <div className="stat-card">
            <span>Lavagens</span>
            <strong>{wash.length}</strong>
          </div>
        </div>

        <div className="panel-card">
          <h3>Logs da equipe</h3>

          {records.length === 0 ? (
            <div className="empty">
              Nenhum log disponível.
            </div>
          ) : (
            records.slice(0, 15).map((item) => (
              <div className="activity" key={item.id}>
                <div>
                  <strong>{item.type}</strong>
                  <span>
                    {item.author || item.responsible || "Sistema"}
                  </span>
                </div>

                <small>{item.date}</small>
              </div>
            ))
          )}
        </div>
      </>
    );
  }

  function renderGerente() {
    return (
      <>
        <SectionTitle
          title="Painel do Gerente"
          subtitle="Controle administrativo completo."
        />

        <div className="manager-grid">
          <button onClick={() => setActiveTab("registrar-acao")}>
            <span>⚔</span>
            <b>Registrar Ação</b>
            <small>Criar ação para os membros</small>
          </button>

          <button onClick={() => setActiveTab("vendas")}>
            <span>◈</span>
            <b>Registro de Venda</b>
            <small>Cadastrar vendas</small>
          </button>

          <button onClick={() => setActiveTab("encomendas")}>
            <span>▣</span>
            <b>Encomendas</b>
            <small>Pedidos e datas de entrega</small>
          </button>

          <button onClick={() => setActiveTab("lavagem")}>
            <span>◆</span>
            <b>Lavagem Cliente</b>
            <small>Parceria, FAC e comprovantes</small>
          </button>

          <button onClick={() => setActiveTab("adv")}>
            <span>!</span>
            <b>ADV / Rebaixamento</b>
            <small>ADV 1, 2 e 3</small>
          </button>

          <button onClick={() => setActiveTab("recrutamento")}>
            <span>♙</span>
            <b>Recrutamento</b>
            <small>Registrar novos membros</small>
          </button>

          <button onClick={() => setActiveTab("registros")}>
            <span>☷</span>
            <b>Logs</b>
            <small>Histórico geral</small>
          </button>

          <button onClick={() => setActiveTab("rankings")}>
            <span>★</span>
            <b>Rankings</b>
            <small>Desempenho da equipe</small>
          </button>
        </div>
      </>
    );
  }

  function renderContent() {
    switch (activeTab) {
      case "inicio":
        return renderInicio();

      case "registrar-acao":
        return renderRegistrarAcao();

      case "acoes":
        return renderAcoes();

      case "vendas":
        return renderVendas();

      case "encomendas":
        return renderEncomendas();

      case "adv":
        return renderAdv();

      case "lavagem":
        return renderLavagem();

      case "recrutamento":
        return renderRecrutamento();

      case "registros":
        return renderRegistros();

      case "membros":
        return renderMembros();

      case "rankings":
        return renderRankings();

      case "lider":
        return renderLider();

      case "gerente":
        return renderGerente();

      case "ausencia":
        return renderMembros();

      default:
        return isManager
          ? renderInicio()
          : renderMembros();
    }
  }

  return (
    <div className="mf-dashboard">
      <style>{`
        * {
          box-sizing: border-box;
        }

        .mf-dashboard {
          min-height: 100vh;
          background:
            radial-gradient(circle at 80% 0%, rgba(212,169,58,.10), transparent 28%),
            #080808;
          color: #f2f2f2;
          display: flex;
          font-family: Inter, Arial, sans-serif;
        }

        .mf-sidebar {
          width: 265px;
          min-height: 100vh;
          background: #0c0c0c;
          border-right: 1px solid rgba(212,169,58,.18);
          padding: 25px 16px;
          position: sticky;
          top: 0;
          height: 100vh;
          overflow-y: auto;
        }

        .brand {
          padding: 8px 12px 28px;
          border-bottom: 1px solid rgba(255,255,255,.07);
          margin-bottom: 20px;
        }

        .brand-mark {
          width: 46px;
          height: 46px;
          border: 1px solid #d4a93a;
          border-radius: 14px;
          display: grid;
          place-items: center;
          color: #d4a93a;
          font-size: 23px;
          margin-bottom: 12px;
          box-shadow: 0 0 25px rgba(212,169,58,.12);
        }

        .brand h1 {
          margin: 0;
          font-size: 18px;
          letter-spacing: 2px;
        }

        .brand p {
          margin: 6px 0 0;
          color: #777;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1.4px;
        }

        .menu-label {
          color: #555;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          padding: 0 12px;
          margin: 18px 0 8px;
        }

        .menu {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .menu button {
          border: 0;
          background: transparent;
          color: #999;
          padding: 12px;
          border-radius: 12px;
          cursor: pointer;
          text-align: left;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: .18s;
          font-size: 13px;
        }

        .menu button:hover {
          color: #fff;
          background: rgba(255,255,255,.04);
        }

        .menu button.active {
          background: linear-gradient(
            90deg,
            rgba(212,169,58,.18),
            rgba(212,169,58,.05)
          );
          color: #d4a93a;
          border: 1px solid rgba(212,169,58,.22);
        }

        .menu-icon {
          width: 22px;
          text-align: center;
          font-size: 16px;
        }

        .sidebar-user {
          margin-top: 25px;
          padding: 14px;
          background: #111;
          border: 1px solid rgba(255,255,255,.06);
          border-radius: 14px;
        }

        .sidebar-user span {
          display: block;
          color: #666;
          font-size: 10px;
          text-transform: uppercase;
          margin-bottom: 5px;
        }

        .sidebar-user strong {
          color: #ddd;
          font-size: 13px;
        }

        .main {
          flex: 1;
          min-width: 0;
        }

        .topbar {
          height: 75px;
          border-bottom: 1px solid rgba(255,255,255,.07);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 34px;
          background: rgba(8,8,8,.86);
          backdrop-filter: blur(15px);
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .topbar-title {
          font-size: 13px;
          color: #888;
        }

        .topbar-title b {
          color: #d4a93a;
        }

        .user-pill {
          border: 1px solid rgba(212,169,58,.2);
          border-radius: 999px;
          padding: 8px 13px;
          font-size: 12px;
          color: #bbb;
        }

        .content {
          max-width: 1500px;
          margin: 0 auto;
          padding: 35px;
        }

        .section-title {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 28px;
        }

        .section-title h2 {
          margin: 0;
          font-size: 27px;
          letter-spacing: -.5px;
        }

        .section-title p {
          margin: 8px 0 0;
          color: #777;
          font-size: 13px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 15px;
          margin-bottom: 20px;
        }

        .stat-card,
        .panel-card,
        .form-card,
        .ranking-card,
        .action-card,
        .records-list {
          background: linear-gradient(
            145deg,
            #111,
            #0d0d0d
          );
          border: 1px solid rgba(255,255,255,.07);
          border-radius: 18px;
          box-shadow: 0 15px 40px rgba(0,0,0,.18);
        }

        .stat-card {
          padding: 22px;
        }

        .stat-card span,
        .info-grid span,
        .wash-data span,
        .record-row span {
          color: #6f6f6f;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: .7px;
          display: block;
        }

        .stat-card strong {
          display: block;
          color: #d4a93a;
          font-size: 30px;
          margin: 10px 0 5px;
        }

        .stat-card small {
          color: #666;
          font-size: 11px;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
        }

        .panel-card {
          padding: 23px;
        }

        .panel-card h3,
        .records-list > h3 {
          margin: 0 0 18px;
          font-size: 15px;
        }

        .activity,
        .mini-action,
        .record-row {
          border-bottom: 1px solid rgba(255,255,255,.06);
          padding: 13px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
        }

        .activity:last-child,
        .mini-action:last-child {
          border-bottom: 0;
        }

        .activity strong,
        .mini-action strong {
          display: block;
          font-size: 13px;
        }

        .activity span,
        .mini-action span {
          display: block;
          color: #777;
          font-size: 11px;
          margin-top: 4px;
        }

        .activity small {
          color: #666;
        }

        .empty {
          padding: 25px;
          color: #666;
          border: 1px dashed rgba(255,255,255,.08);
          border-radius: 13px;
          text-align: center;
          font-size: 12px;
        }

        .empty.large {
          padding: 75px 30px;
        }

        .empty-icon {
          font-size: 36px;
          color: #d4a93a;
          margin-bottom: 12px;
        }

        .empty h3 {
          color: #bbb;
          margin: 0 0 8px;
        }

        .empty p {
          margin: 0;
          color: #666;
        }

        .form-card {
          padding: 25px;
          margin-bottom: 20px;
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        label {
          display: flex;
          flex-direction: column;
          gap: 8px;
          color: #999;
          font-size: 12px;
        }

        input,
        select,
        textarea {
          width: 100%;
          border: 1px solid rgba(255,255,255,.08);
          background: #090909;
          color: #eee;
          border-radius: 11px;
          padding: 12px 13px;
          outline: none;
          font-family: inherit;
          transition: .18s;
        }

        input:focus,
        select:focus,
        textarea:focus {
          border-color: rgba(212,169,58,.6);
          box-shadow: 0 0 0 3px rgba(212,169,58,.07);
        }

        textarea {
          min-height: 95px;
          resize: vertical;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .gold-button,
        .danger-button {
          border: 0;
          border-radius: 11px;
          padding: 13px 18px;
          cursor: pointer;
          font-weight: 700;
          font-size: 12px;
          transition: .18s;
        }

        .gold-button {
          background: linear-gradient(135deg, #d4a93a, #a97d18);
          color: #080808;
          box-shadow: 0 8px 25px rgba(212,169,58,.12);
        }

        .gold-button:hover {
          transform: translateY(-1px);
          filter: brightness(1.08);
        }

        .gold-button:disabled {
          opacity: .4;
          cursor: not-allowed;
        }

        .danger-button {
          background: rgba(160,50,50,.14);
          border: 1px solid rgba(200,70,70,.25);
          color: #dc7777;
        }

        .selected-action {
          border: 1px solid rgba(212,169,58,.2);
          background: rgba(212,169,58,.035);
          border-radius: 15px;
          padding: 20px;
        }

        .action-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          margin-bottom: 20px;
        }

        .action-header h3,
        .action-top h3 {
          margin: 8px 0 4px;
          font-size: 20px;
        }

        .action-header > strong,
        .action-value {
          color: #d4a93a;
          font-size: 16px;
          font-weight: 800;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
        }

        .info-grid > div {
          background: rgba(255,255,255,.025);
          border: 1px solid rgba(255,255,255,.045);
          border-radius: 11px;
          padding: 13px;
        }

        .info-grid .full {
          grid-column: 1 / -1;
        }

        .info-grid strong {
          display: block;
          margin-top: 7px;
          color: #d0d0d0;
          font-size: 12px;
          line-height: 1.5;
        }

        .action-list {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 18px;
        }

        .action-card {
          padding: 22px;
        }

        .action-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 18px;
          gap: 15px;
        }

        .action-top > div:first-child span {
          color: #777;
          font-size: 11px;
        }

        .participants {
          margin: 18px 0;
          padding-top: 15px;
          border-top: 1px solid rgba(255,255,255,.06);
        }

        .participants > span {
          display: block;
          color: #666;
          font-size: 10px;
          text-transform: uppercase;
          margin-bottom: 9px;
        }

        .participant-list {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          width: fit-content;
          border: 1px solid rgba(212,169,58,.25);
          background: rgba(212,169,58,.09);
          color: #d4a93a;
          border-radius: 999px;
          padding: 5px 9px;
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: .5px;
        }

        .badge-dark {
          background: #171717;
          border-color: rgba(255,255,255,.08);
          color: #aaa;
        }

        .badge-warning {
          color: #d6a94c;
          border-color: rgba(214,169,76,.25);
          background: rgba(214,169,76,.08);
        }

        .field-title {
          color: #999;
          font-size: 12px;
          margin-bottom: -7px;
        }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }

        .product-button,
        .adv-button,
        .choice {
          border: 1px solid rgba(255,255,255,.08);
          background: #0b0b0b;
          color: #888;
          padding: 14px;
          border-radius: 12px;
          cursor: pointer;
          text-align: left;
          transition: .18s;
        }

        .product-button span {
          display: inline-grid;
          place-items: center;
          width: 21px;
          height: 21px;
          border-radius: 50%;
          margin-right: 8px;
          background: #151515;
          color: #777;
        }

        .product-button.selected,
        .adv-button.selected,
        .choice.selected {
          color: #d4a93a;
          border-color: rgba(212,169,58,.5);
          background: rgba(212,169,58,.09);
        }

        .product-button.selected span {
          background: #d4a93a;
          color: #080808;
        }

        .adv-grid,
        .choice-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }

        .choice-grid {
          grid-template-columns: 1fr 1fr;
        }

        .records-list {
          padding: 23px;
        }

        .record-row {
          padding: 17px 0;
        }

        .record-row h3 {
          margin: 7px 0 0;
          font-size: 13px;
        }

        .record-row > div {
          min-width: 0;
        }

        .record-row > div:nth-child(2),
        .record-row > div:nth-child(3) {
          text-align: right;
        }

        .record-row b {
          display: block;
          color: #ccc;
          margin-top: 6px;
          font-size: 12px;
        }

        .record-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .record-head h3 {
          margin: 9px 0 0;
        }

        .wash-record {
          border: 1px solid rgba(255,255,255,.06);
          background: #0d0d0d;
          padding: 20px;
          border-radius: 14px;
          margin-top: 12px;
        }

        .wash-data {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
        }

        .wash-data > div {
          background: #101010;
          padding: 12px;
          border-radius: 10px;
        }

        .wash-data b {
          display: block;
          margin-top: 6px;
          color: #ccc;
          font-size: 12px;
        }

        .proof {
          margin-top: 12px;
          padding: 13px;
          background: #101010;
          border-radius: 10px;
        }

        .proof span {
          color: #666;
          font-size: 10px;
          display: block;
          text-transform: uppercase;
        }

        .proof b {
          display: block;
          margin-top: 5px;
          color: #bbb;
          font-size: 12px;
        }

        .wash-preview {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          padding: 16px;
          border: 1px solid rgba(212,169,58,.2);
          background: rgba(212,169,58,.05);
          border-radius: 13px;
        }

        .wash-preview span {
          display: block;
          color: #777;
          font-size: 10px;
          text-transform: uppercase;
        }

        .wash-preview strong {
          display: block;
          color: #d4a93a;
          font-size: 17px;
          margin-top: 6px;
        }

        .file-name {
          color: #d4a93a;
          font-size: 10px;
        }

        .ranking-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 18px;
        }

        .ranking-card {
          padding: 20px;
        }

        .ranking-title {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
        }

        .ranking-title span {
          color: #d4a93a;
          font-size: 20px;
        }

        .ranking-title h3 {
          margin: 0;
          font-size: 14px;
        }

        .ranking-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 13px 0;
          border-top: 1px solid rgba(255,255,255,.05);
        }

        .position {
          color: #d4a93a;
          font-weight: 800;
          width: 32px;
        }

        .rank-name {
          flex: 1;
        }

        .rank-name strong {
          display: block;
          font-size: 12px;
        }

        .rank-name small {
          color: #666;
          font-size: 10px;
        }

        .points {
          font-size: 18px;
          font-weight: 800;
          color: #ccc;
        }

        .member-hero {
          display: flex;
          align-items: center;
          gap: 17px;
          padding: 23px;
          margin-bottom: 18px;
          border-radius: 18px;
          background: linear-gradient(
            135deg,
            rgba(212,169,58,.1),
            rgba(255,255,255,.02)
          );
          border: 1px solid rgba(212,169,58,.18);
        }

        .avatar {
          width: 55px;
          height: 55px;
          display: grid;
          place-items: center;
          border-radius: 16px;
          color: #0b0b0b;
          background: #d4a93a;
          font-size: 22px;
          font-weight: 800;
        }

        .member-hero span {
          color: #d4a93a;
          font-size: 9px;
          letter-spacing: 1px;
        }

        .member-hero h2 {
          margin: 5px 0;
          font-size: 18px;
        }

        .member-hero p {
          color: #666;
          margin: 0;
          font-size: 11px;
        }

        .manager-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }

        .manager-grid button {
          min-height: 145px;
          border: 1px solid rgba(255,255,255,.07);
          border-radius: 16px;
          background: linear-gradient(145deg,#121212,#0c0c0c);
          color: #ccc;
          text-align: left;
          padding: 20px;
          cursor: pointer;
          transition: .18s;
        }

        .manager-grid button:hover {
          transform: translateY(-2px);
          border-color: rgba(212,169,58,.35);
          box-shadow: 0 15px 35px rgba(0,0,0,.25);
        }

        .manager-grid span {
          display: block;
          color: #d4a93a;
          font-size: 24px;
          margin-bottom: 17px;
        }

        .manager-grid b {
          display: block;
          font-size: 13px;
        }

        .manager-grid small {
          display: block;
          color: #666;
          margin-top: 6px;
          font-size: 10px;
        }

        .notice {
          position: fixed;
          right: 25px;
          bottom: 25px;
          z-index: 100;
          background: #151515;
          border: 1px solid rgba(212,169,58,.35);
          color: #d4a93a;
          padding: 14px 18px;
          border-radius: 12px;
          box-shadow: 0 15px 40px rgba(0,0,0,.4);
          font-size: 12px;
        }

        @media (max-width: 1100px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .action-list,
          .ranking-grid {
            grid-template-columns: 1fr;
          }

          .manager-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .info-grid,
          .wash-data {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 800px) {
          .mf-dashboard {
            display: block;
          }

          .mf-sidebar {
            width: 100%;
            min-height: auto;
            height: auto;
            position: relative;
            border-right: 0;
            border-bottom: 1px solid rgba(255,255,255,.07);
          }

          .menu {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
          }

          .sidebar-user {
            display: none;
          }

          .topbar {
            padding: 0 18px;
          }

          .content {
            padding: 22px 15px;
          }

          .dashboard-grid,
          .form-grid {
            grid-template-columns: 1fr;
          }

          .stats-grid {
            grid-template-columns: 1fr 1fr;
          }

          .product-grid,
          .manager-grid {
            grid-template-columns: 1fr 1fr;
          }

          .wash-preview {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 500px) {
          .stats-grid,
          .product-grid,
          .manager-grid,
          .adv-grid,
          .choice-grid {
            grid-template-columns: 1fr;
          }

          .info-grid,
          .wash-data {
            grid-template-columns: 1fr;
          }

          .info-grid .full {
            grid-column: auto;
          }

          .topbar-title {
            display: none;
          }
        }
      `}</style>

      <aside className="mf-sidebar">
        <div className="brand">
          <div className="brand-mark">♛</div>
          <h1>MORRO DO FÊNIX</h1>
          <p>Sistema de gerenciamento</p>
        </div>

        <div className="menu-label">
          Navegação
        </div>

        <nav className="menu">
          {menu.map((item) => (
            <button
              key={item.id}
              className={
                activeTab === item.id ? "active" : ""
              }
              onClick={() => setActiveTab(item.id)}
            >
              <span className="menu-icon">
                {item.icon}
              </span>

              {item.label}
            </button>
          ))}
        </nav>

        <div className="sidebar-user">
          <span>Usuário conectado</span>
          <strong>{user?.nome || "Usuário"}</strong>
          <span style={{ marginTop: 7 }}>
            {role}
          </span>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="topbar-title">
            MORRO DO FÊNIX /{" "}
            <b>
              {menu.find((x) => x.id === activeTab)?.label ||
                "Painel"}
            </b>
          </div>

          <div className="user-pill">
            {user?.nome || "Usuário"} • {role}
          </div>
        </header>

        <section className="content">
          {renderContent()}
        </section>
      </main>

      {notice && <div className="notice">{notice}</div>}
    </div>
  );
}

/* =========================================================
   COMPONENTE AUXILIAR
   ========================================================= */

function RecordsTable({
  title,
  data,
  empty,
  render,
}) {
  return (
    <div className="records-list">
      <h3>{title}</h3>

      {data.length === 0 ? (
        <div className="empty">{empty}</div>
      ) : (
        data.map((item) => (
          <div className="record-row" key={item.id}>
            <div>{render(item)}</div>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;