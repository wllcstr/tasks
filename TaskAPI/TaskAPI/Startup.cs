using System;
using System.Web.Http;
using System.Threading.Tasks;
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Microsoft.Owin.Security;
using Owin;
using Microsoft.Owin.Security.OAuth;
using TaskAPI.Providers;

[assembly: OwinStartup(typeof(TaskAPI.Startup))]

namespace TaskAPI {
    public class Startup {
        public void Configuration(IAppBuilder app) {
            // Configurações da WebAPI
            var config = new HttpConfiguration();

            // Rotas
            WebApiConfig.Register(config);

            // Usando Cors
            app.UseCors(CorsOptions.AllowAll);

            // ativando a geração de token de acesso
            ConfigureAuth(app);

            // Ativando as Configurações
            app.UseWebApi(config);

        }

        private void ConfigureAuth(IAppBuilder app) {
            OAuthAuthorizationServerOptions OAuthCfgOptions = new OAuthAuthorizationServerOptions() {
                // Libera acesso sem HTTPS
                AllowInsecureHttp = true,
                // define a rota para a chamada do token
                TokenEndpointPath = new PathString("/token"),
                // duração
                AccessTokenExpireTimeSpan = TimeSpan.FromHours(2),
                Provider = new AuthorizationServerProvider()
            };

            app.UseOAuthAuthorizationServer(OAuthCfgOptions);
            app.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions());
        }

    }
}
