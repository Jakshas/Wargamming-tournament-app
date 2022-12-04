package com.example.backend;

import java.util.Collections;

import org.springframework.graphql.server.WebGraphQlInterceptor;
import org.springframework.graphql.server.WebGraphQlRequest;
import org.springframework.graphql.server.WebGraphQlResponse;

import reactor.core.publisher.Mono;

class HeaderInterceptor implements WebGraphQlInterceptor {

    @Override
    public Mono<WebGraphQlResponse> intercept(WebGraphQlRequest request, Chain chain) {
        String value = request.getHeaders().getFirst("authorization");
        request.configureExecutionInput((executionInput, builder) -> builder
                .graphQLContext(Collections.singletonMap("authorization", value)).build());
        return chain.next(request);
    }
}
