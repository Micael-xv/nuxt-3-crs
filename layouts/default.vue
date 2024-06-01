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
          <v-list-item prepend-icon="mdi mdi-solar-panel-large" to="/tabela-produto" title="Tabela produtos" value="Tabela"/>
          <v-list-item prepend-icon="mdi mdi-table-plus" to="/tabela-categoria" title="Tabela categorias" value="Tabela"/>
          <v-list-item prepend-icon="mdi mdi-cart-minus" to="/pedidos" title="Pedidos" value="Tabela"/>
          <v-list-item prepend-icon="mdi mdi-ticket-percent-outline" to="/cupons" title="Cupons" value="Tabela"/>
        </v-list>
      </v-navigation-drawer>
      <v-main style="height: 100vh; background-color: black">
        <slot/>
      </v-main>
    </v-layout>
  </v-card>
</template>