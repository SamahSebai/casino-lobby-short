export const fetchLobbyData = async () => {
  const response = await fetch('https://cubeia-code-tests.s3.eu-west-1.amazonaws.com/lobby.json');
  const data = await response.json();
  return data;
};
