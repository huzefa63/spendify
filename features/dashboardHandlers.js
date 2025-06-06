import axios from "axios";

export async function getPieChartData(param) {
  const token = localStorage.getItem("token");
  const params = new URLSearchParams(param).toString();
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/transactions/getCategoryTransaction?${params}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data.transactions || [];
  } catch (err) {
    console.log(err);
    return [];
  }
}

export async function getLineChartData(searchParams) {
  const token = localStorage.getItem("token");
  const params = new URLSearchParams(searchParams).toString();
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/transactions/getYearlyTransaction?${params}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res.data);
    return res.data.transactions;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function getDashboardCardsData(params) {
  const token = localStorage.getItem("token");
  const param = new URLSearchParams(params).toString();
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/transactions/getFinancialStats?${param}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res);
    if (res.data.status === "success")
      return res.data.transactionFlow[0] || null;
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
}

