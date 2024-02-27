async function getMenu(id: string) {
  // const res = await fetch('http://localhost:8000/api/restaurant_user_menu/' + id, { next: { revalidate: 5 } })

  // return res.json()
}

export default async function Menu({ params }: { params: { menuId: string } }) {
  // const menu = await getMenu(params.menuId)

  return <div></div>
}
