package com.example.demo.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.example.demo.jwt.filter.JwtAuthenticationFilter;

import java.util.Arrays;

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

        //필터 생성
        http.addFilterBefore(new JwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

        /*
        // 인가 설정
        http.authorizeHttpRequests(authorizeHttpRequests -> 
            authorizeHttpRequests
                .requestMatchers("/", "/api/login").permitAll()  // "/"와 "/login"은 모두 허용함
                .requestMatchers("/api/user/**").hasAnyRole("USER", "ADMIN")  // "/user/**"는 USER, ADMIN만 접근 가능함
                .requestMatchers("/api/admin/**").hasRole("ADMIN")  // "/admin/**"는 ADMIN만 접근 가능함
				.anyRequest().authenticated()
        );   이렇게 일일이 나누는 것보다 아래처럼   */

        http.authorizeHttpRequests(authorize -> authorize
                .requestMatchers("/api/auth/**").permitAll() // 회원가입 및 로그인은 인증 없이 접근 가능
                .requestMatchers("/api/user/**").authenticated() // 나머지는 인증 필요
        );

		// UserDetailsService 추가 설정 (null로 설정할 경우 생략 가능)
        http.userDetailsService(null);

        // SecurityFilterChain 반환
        return http.build();
    }
        
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173")); // 허용할 출처
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS")); // 허용할 HTTP 메서드
        configuration.setAllowedHeaders(Arrays.asList("*")); // 허용할 헤더
        configuration.setAllowCredentials(true); // 인증 정보 포함 허용

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // 비밀번호 암호화를 위한 BCrypt
    }
}
