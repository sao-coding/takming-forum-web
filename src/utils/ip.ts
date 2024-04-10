const getIP = async () => {
  const res = await fetch("https://api.ipify.org/?format=json")
  const data = await res.json()
  return data.ip
}

export default getIP
