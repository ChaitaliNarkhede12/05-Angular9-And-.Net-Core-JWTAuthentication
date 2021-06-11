using ApplicationLayer.Interface;
using ApplicationLayer.Services;
using DataAccess.Interfaces;
using DataAccess.Models;
using DataAccess.Reposiotry;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Models;
using NetCoreJWTAuth.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NetCoreJWTAuth
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //Fetching appsettings Value
            var appSettingSections = Configuration.GetSection("JwtCongifuration");
            services.Configure<AppSettings>(appSettingSections);

            var appSettings = appSettingSections.Get<AppSettings>();
            //var securityKey = Encoding.ASCII.GetBytes(appSettings.SecretKey);

            //Jwt Authentication
            //services.AddAuthentication(au =>
            //{
            //    au.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            //    au.DefaultSignInScheme = JwtBearerDefaults.AuthenticationScheme;
            //}).AddJwtBearer(jwt =>
            //{
            //    jwt.RequireHttpsMetadata = false;
            //    jwt.SaveToken = true;
            //    jwt.TokenValidationParameters = new TokenValidationParameters
            //    {
            //        ValidateIssuerSigningKey = true,
            //        IssuerSigningKey = new SymmetricSecurityKey(securityKey),
            //        ValidateIssuer = false,
            //        ValidateAudience = false,
            //    };
            //});

            services.AddControllers();

            //Add Connection String
            services.AddDbContext<DemoDatabaseContext>(item => item.UseSqlServer
              (Configuration.GetConnectionString("DemoDBConnection")));

            //Add Cors Policy
            services.AddCors(option => option.AddPolicy("OIPAPolicy",
                builder =>
                {
                    builder.AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod();
                })
            );

            //services.AddCors(options =>
            //{
            //    options.AddDefaultPolicy(
            //        builder =>
            //        {
            //            builder.AllowAnyOrigin()
            //            .AllowAnyHeader()
            //            .AllowAnyMethod();
            //        });
            //});

            //Inject Dependency Injection
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));

            services.AddScoped<IEmployeeAppService, EmployeeAppService>();
            services.AddScoped<IUserAppService, UserAppService>();
            services.AddScoped<ITokenRepository, TokenRepository>();
            services.AddScoped<ITokenAppService, TokenAppService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            //Add JWT middleware to set user in context/session ->
            //It will fetch user from token we are passing to request in web api
            app.UseMiddleware<JwtMiddleware>();

            app.UseAuthorization();
            //app.UseCors();
            app.UseCors("OIPAPolicy");

            app.UseHttpsRedirection();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
