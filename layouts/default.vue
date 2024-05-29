<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer
        expand-on-hover
        rail
        theme="dark"
      >
        <v-list>
          <v-list-item
            prepend-avatar="https://avatars.githubusercontent.com/u/75547915?v=4"
            subtitle="micael.trevisan@unochapeco.edu.br"
            title="Micael Trevisan"
          />
        </v-list>

        <v-divider/>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-home" to="/" title="Home" value="home"/>
          <v-list-item prepend-icon="mdi-table" to="/tabela-produto" title="Tabela produtos" value="Tabela"/>
          <v-list-item prepend-icon="mdi-table" to="/tabela-categoria" title="Tabela categoria" value="Tabela"/>
        </v-list>
      </v-navigation-drawer>
      <v-main style="height: 100vh; background-color: black">
        <slot/>
      </v-main>
    </v-layout>
  </v-card>
</template>