<template>
  <header class="flex items-center bg-gray-800 p-3 flex-wrap">
    <RouterLink to="/" class="p-2 mr-4 inline-flex items-center">
      <h1 class="text-xl text-white font-bold uppercase tracking-wide">
        <span class="text-primary">T4Tech</span> Frontend Challenge
      </h1>
    </RouterLink>
    <button
      class="text-white inline-flex p-3 hover:bg-gray-900 rounded lg:hidden ml-auto hover:text-white outline-none nav-toggler"
      data-target="#navigation"
    >
      <i class="material-icons">menu</i>
    </button>
    <div class="hidden top-navbar w-full lg:inline-flex lg:flex-grow lg:w-auto" id="navigation">
      <div
        class="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start flex flex-col lg:h-auto"
      >
        <nav>
          <RouterLink
            to="/"
            class="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
            >Home</RouterLink
          >
          <RouterLink
            to="/favorites"
            class="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
            >Favorites</RouterLink
          >
          <RouterLink
            to="/about"
            class="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
            >About</RouterLink
          >
        </nav>
      </div>
    </div>
  </header>
</template>
