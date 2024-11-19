package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {
    // OK : (version : after SpringSecurity 5.4 ⬆)
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // 폼 기반 로그인 비활성화
        http.formLogin(login -> login.disable());

        // HTTP 기본 인증 비활성화
        http.httpBasic(basic -> basic.disable());

        // CSRF(Cross-Site Request Forgery) 공격 방어 기능 비활성화
        http.csrf(csrf -> csrf.disable());

        // 필터 생성 (필터가 필요하면 추가)
        // http.addFilterBefore(new JwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

        // 인가 설정
        http.authorizeHttpRequests(authorizeHttpRequests -> 
            authorizeHttpRequests
                .requestMatchers("/", "/api/login").permitAll()  // "/"와 "/login"은 모두 허용
                .requestMatchers("/api/user/**").hasAnyRole("USER", "ADMIN")  // "/user/**"는 USER, ADMIN만 접근 가능
                .requestMatchers("/api/admin/**").hasRole("ADMIN")  // "/admin/**"는 ADMIN만 접근 가능
				.anyRequest().authenticated()
        );

		//인증방식 설정해주기
        http.userDetailsService(null);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();   // 암호화 방식 : BCrypt
    }
}
