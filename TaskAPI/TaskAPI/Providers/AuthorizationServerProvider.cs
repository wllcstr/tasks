using Microsoft.Owin.Security.OAuth;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using TaskAPI.Models;

namespace TaskAPI.Providers {
    public class AuthorizationServerProvider : OAuthAuthorizationServerProvider {

        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext ctx) {
            ctx.Validated();
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext ctx) {
            // verifica se o usuário e senham conferem
            if (UserAuth.Login(ctx.UserName, ctx.Password)) {
                var identity = new ClaimsIdentity(ctx.Options.AuthenticationType);
                identity.AddClaim(new Claim("userName", ctx.UserName));
                identity.AddClaim(new Claim("role", "user"));
                ctx.Validated(identity);
            } else {
                // caso contrrário notifica erro
                ctx.SetError("Acesso Negado", "Credenciais inválidas");
                return;
            }
        }

        
    }
}