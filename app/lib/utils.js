export const city = [
  {
    id: 1,
    name: "Bogotá"
  }, 
  {
    id: 2,
    name: "Barranquilla"
  },
  {
    id: 3,
    name: "Medellín"
  },
  {
    id: 4,
    name: "Cartagena"
  },
  {
    id: 5,
    name: "Cali"
  },
  {
    id: 6,
    name: "Bucaramanga"
  },
  {
    id: 7,
    name: "Armenia"
  }
]

export const formatCurrency = (amount) => {
  return (amount).toLocaleString('en-US', {
    style: 'currency',
    currency: 'COP',
  });
};

export const successAlert = {
  variant: "success",
  autoHideDuration: 2000
}

export const errorAlert = {
  variant: "error",
  autoHidenDuration: 2000
}
