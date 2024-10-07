import React, { useState, useEffect } from 'react';
import { fetchLobbyData } from '../services/api';

function Lobby() {
  const [lobbyData, setLobbyData] = useState([]);
  const [currency, setCurrency] = useState('EUR');
  const [category, setCategory] = useState('ALL');
  const [studio, setStudio] = useState('ALL');
  const [games, setGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 8;

  useEffect(() => {
    async function loadData() {
      const data = await fetchLobbyData();
      setLobbyData(data);
      setGames(data.games); // Initial load with all games
    }
    loadData();
  }, []);

  // Reset the current page when filters change
  const resetPagination = () => {
    setCurrentPage(1); // Go to the first page
  };

  // Currency filter
  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
    filterGames(e.target.value, category, studio);
    resetPagination();
  };

  // Category filter
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    filterGames(currency, e.target.value, studio);
    resetPagination();
  };

  // Studio filter
  const handleStudioChange = (e) => {
    setStudio(e.target.value);
    filterGames(currency, category, e.target.value);
    resetPagination();
  };

  // Filter games based on selected currency, category, and studio
  const filterGames = (currency, category, studio) => {
    let filteredGames = lobbyData.games;

    // Filter by currency
    if (currency !== 'ALL') {
      filteredGames = filteredGames.filter((game) => {
        const studioData = lobbyData.studios[game.studioId];
        return studioData && !studioData.blockedCurrencies?.includes(currency);
      });
    }

    // Filter by category
    if (category !== 'ALL') {
      filteredGames = filteredGames.filter((game) => game.gameTags?.includes(parseInt(category)));
    }

    // Filter by studio
    if (studio !== 'ALL') {
      filteredGames = filteredGames.filter((game) => game.studioId === parseInt(studio));
    }

    setGames(filteredGames);
  };

  // Pagination logic
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);

  const totalPages = Math.ceil(games.length / gamesPerPage);

  // Handle page change
  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  // Calculate the page numbers to display (limit to 5 around the current page)
  const getVisiblePages = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // Limit to 5 pages to show at a time
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <header className="p-4 flex justify-center">
        <h1 className="text-3xl font-bold text-green_primary ">Casino Lobby</h1>
      </header>

      <div className="p-4 flex space-x-4 ml-10">
        <select onChange={handleCurrencyChange} value={currency} className="p-2 bg-gray-800 border-2 border-green_primary rounded">
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
          <option value="mBTC">mBTC</option>
        </select>

        <select onChange={handleCategoryChange} value={category} className="p-2 bg-gray-800 rounded border-2 border-green_primary">
          <option value="ALL">All Categories</option>
          {lobbyData.tags?.map((tag) => (
            <option key={tag.id} value={tag.id}>
              {tag.name}
            </option>
          ))}
        </select>

        <select onChange={handleStudioChange} value={studio} className="p-2 bg-gray-800 rounded border-2 border-green_primary">
          <option value="ALL">All Studios</option>
          {lobbyData.studios?.map((studio) => (
            <option key={studio.id} value={studio.id}>
              {studio.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-4 gap-4 p-4">
        {currentGames.map((game) => (
          <div key={game.id} className="bg-gray-900 rounded p-4">
            <img src={game.imageUrl} alt={game.name} className="w-full h-40 object-cover" />
            <h2 className="text-xl font-bold mt-2">{game.name}</h2>
            <p className="text-sm">{lobbyData.studios[game.studioId]?.name}</p>
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center items-center space-x-2 mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="bg-gray-700 px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>

        {/* Display a limited number of page numbers */}
        {getVisiblePages().map((page) => (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={`px-4 py-2 rounded ${currentPage === page ? 'bg-green-500' : 'bg-gray-700'}`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="bg-gray-700 px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Lobby;
