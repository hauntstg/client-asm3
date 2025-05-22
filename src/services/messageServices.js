const REST_API = process.env.REACT_APP_API;
export async function fetchDataMessagesByRoomId(roomId) {
  try {
    const res = await fetch(
      `${REST_API}/admin/messages-roomId?roomId=` + roomId
    );
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
