<template>
    <Page class="page page--home bg bg--cream c-white" actionBarHidden="true" backgroundSpanUnderStatusBar="true">
      <ScrollView class="panel panel--home" orientation="vertical">
        <GridLayout columns="*" rows="*, auto" width="100%" height="100%">

          <FlexboxLayout class="form__top container bg bg--clip" width="100%" row="0">
            <StackLayout class="row text-center" height="100%">
              <FlexboxLayout alignItems="center" justifyContent="center" height="100%" width="100%">
                <!-- <Image src="~/assets/img/logo.png"/> -->
              </FlexboxLayout>
            </StackLayout>
          </FlexboxLayout>

          <FlexboxLayout class="form__bottom container pb-4" width="100%" row="1">
            <StackLayout class="row text-center">
              <Button class="close my-fa" text.decode="&#xe801;" @tap="$goToPage(Wellcome)" />

              <TextField class="field" v-model="name" hint="Name" @focus="clearErrors('name')"/>
              <Label class="error error--field" :text="errors.name" />

              <TextField class="field" v-model="email" hint="email" keyboardType="email" @focus="clearErrors('email')"/>
              <Label class="error error--field" :text="errors.email" />

              <TextField class="field" v-model="password" hint="password" :secure="true" @focus="clearErrors('password')"/>
              <Label class="error error--field" :text="errors.password" />>

              <Button class="btn green shadow" text="Sign up" @tap="onSignUp" />

              <Label class="mt-2 new-account" text="Already have an account?" @tap="$goToPage(Login)" />
            </StackLayout>
          </FlexboxLayout>
          
        </GridLayout>
      </ScrollView>
    </Page>
</template>

<script>
  import Wellcome from './Wellcome';
  import Home from '@/pages/Home';
  import Login from './Login';
  import AuthService from '@/services/auth';

  export default {
      name: 'Registration',
      computed: {
      },
      data() {
        return {
          Wellcome,
          Login,
          
          name: '',
          email: '',
          password: '',
          errors: {
            email: '',
            password: ''
          },
        }
      },
      methods: {
        clearErrors (field) {
          if (field) {
            this.$set(this.errors, field, '');
          } else {
            this.errors = {
              email: '',
              password: ''
            };
          }
        },
        async onSignUp () {
          try {
            this.clearErrors();

            const response = await AuthService.signUp({
              name: this.name,
              email: this.email,
              password: this.password
            });

            console.log('--- response', response);

            this.$store.dispatch('setUser', {
              token: response.data.token,
              userId: response.data.data._id
            })
              .then(() => {
                console.log('--- redirect su', );
                this.$goToPage(Home);
              });
          } catch (err) {
            if (err.response && err.response.data && typeof err.response.data.message == 'object') {
              for (const e of err.response.data.message) {
                this.$set(this.errors, e.field, e.message);
              }
            } else if (err.response && err.response.data) {
              alert({
                title: "Error",
                message: err.response.data.message,
                okButtonText: "Try again"
              })
            }
          }
        }
      }
  };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '../app-variables';
    // End custom common variables

    // Custom styles
    .form__top {
      margin-bottom: -20;
    }

    .new-account {
      color: $black;
    }
</style>
