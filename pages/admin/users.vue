<template>
  <v-container style="justify-content: center; border-radius: 25px">
    <v-row>
      <v-col>
        <TabelaComponent
          elevation="20"
          :headers="headers"
          titulo="Users"
          :items="items"
          @criar="dialog = true"
          @excluir="deleteItem"
          @editar="editItem"
          @persist="persist"
        />
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" width="auto" @click:outside="resetDialog">
      <v-card theme="dark" width="700px" height="auto">
        <v-card-title>
          <v-row justify="space-between" align="center">
            <v-col cols="auto"> Criar usuarios </v-col>
            <v-col cols="auto">
              <v-btn
                density="comfortable"
                icon="mdi-plus"
                style="background-color: crimson"
                @click="resetDialog"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="persist">
            <v-container>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="users.username"
                    clearable
                    label="Username"
                    required
                  />
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="users.name"
                    label="Nome completo"
                    clearable
                    placeholder="Micael Alex Trevisan"
                    required
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="users.cpf"
                    v-mask="['###.###.###-##']"
                    placeholder="000.000.000-00"
                    label="CPF"
                    clearable
                    required
                  />
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="users.phone"
                    v-mask="['(##) ####-####', '(##) #####-####']"
                    label="Phone"
                    placeholder="(99) 99999-9999"
                    required
                    clearable
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field 
                    v-model="users.email"
                    label="Email"
                    required
                    clearable
                    placeholder="micael.trevisan@unochapeco.edu.br"
                  />
                </v-col>
                <v-col>
                  <!-- <v-text-field
                    v-model="users.passwordHash"
                    label="Password"
                    required
                    clearable
                  /> -->
                  <v-text-field
                    v-model="users.passwordHash"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="show1 ? 'text' : 'password'"
                    hint="At least 8 characters"
                    label="Normal with hint text"
                    name="input-10-1"
                    counter
                    @click:append="show1 = !show1"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-container fluid>
                    <v-switch
                      v-model="users.role"
                      color="red"
                      false-value="customer"
                      label="Manager"
                      value="manager"
                      hide-details
                    />
                  </v-container>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn
            rounded="xl"
            class="mr-3 mb-3"
            style="background-color: crimson; justify-content: end"
            text="Salvar"
            @click="persist"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mask } from "vue-the-mask";
definePageMeta({
  layout: "admin",
});
export default {
  name: "Users",
  directives: { mask },
  data() {
    return {
      show1: false,
      show2: true,
      password: 'Password',
      rules: {
        required: value => !!value || 'Requer.',
        min: v => v.length >= 8 || 'Min 8 characters',
        emailMatch: () => (`The email and password you entered don't match`),
      },
      dialog: false,
      users: {
        id: null,
        username: null,
        name: null,
        cpf: null,
        phone: null,
        email: null,
        passwordHash: null,
        role: null,
      },
      headers: [
        {
          title: "Identificação",
          key: "id",
        },
        {
          title: "Username",
          key: "username",
        },
        {
          title: "Nome completo",
          key: "name",
        },
        {
          title: "CPF",
          key: "cpf",
        },
        {
          title: "Telefone",
          key: "phone",
        },
        {
          title: "Email",
          key: "email",
        },
        {
          title: "Cargo",
          key: "role",
        },
        {
          title: "Actions",
          key: "actions",
          sortable: false,
        },
      ],
      items: [],
    };
  },
  async created() {
    await this.getItems();
  },
  methods: {
    async getItems() {
      try {
        const response = await this.$api.get("/users");
        this.items = response.data;
      } catch (error) {
        console.error("Erro ao buscar pedidos:", error.message);
        this.$toast.error(
          "Erro ao buscar pedidos. Por favor, tente novamente mais tarde."
        );
      }
    },
    async deleteItem(item) {
      try {
        if (confirm(`Deseja deletar o registro com id ${item.id}`)) {
          const response = await this.$api.post(`/users/destroy/${item.id}`, {
            id: item.id,
          });
          await this.getItems();
          if (response && response.type !== "error") {
            this.$toast.success("user excluído com sucesso.");
          } else {
            throw new Error(response.message || "Erro ao excluir user.");
          }
        }
      } catch (error) {
        console.error("Erro ao excluir user:", error.message);
        this.$toast.error(
          error.message ||
            "Erro ao excluir user. Por favor, tente novamente mais tarde."
        );
      }
    },

    editItem(item) {
      this.users = { ...item };
      this.dialog = true;
    },
    async persist() {
      try {
        if (
          !this.users.username ||
          !this.users.name ||
          !this.users.cpf ||
          !this.users.phone ||
          !this.users.email ||
          !this.users.passwordHash
        ) {
          throw new Error("Todos os campos são obrigatórios.");
        }
        let response;
        if (this.users.id) {
          response = await this.$api.post(
            `/users/persist/${this.users.id}`,
            this.users
          );
          this.$toast.success("user editado com sucesso.");
        } else {
          response = await this.$api.post("/users/persist/", this.users);
          this.$toast.success("user criado com sucesso.");
        }
        this.dialog = false;
        this.users = {
          id: null,
          username: null,
          name: null,
          cpf: null,
          phone: null,
          email: null,
          role: null,
          passwordHash: null,
        };
        await this.getItems();
      } catch (error) {
        console.error("Erro ao persistir user:", error.message);
        this.$toast.warning(
          "Erro ao salvar user. Por favor, verifique os campos e tente novamente."
        );
      }
    },
    resetDialog() {
      this.dialog = false;
      this.users = {
        id: null,
        username: null,
        name: null,
        cpf: null,
        phone: null,
        email: null,
        role: null,
        passwordHash: null,
      };
    },
  },
};
</script>
