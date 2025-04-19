package com.example.demo;



import com.example.demo.model.Food;
import com.example.demo.repository.FoodRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;

import org.springframework.http.MediaType;

import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class FoodControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private FoodRepository foodRepository;

    @BeforeEach
    public void setup() {
        foodRepository.deleteAll(); // Reset DB before each test
    }

    @Test
    public void testGetAllFoodsIntegration() throws Exception {
        Food food1 = new Food("Taco");
        Food food2 = new Food("Salad");
        foodRepository.saveAll(List.of(food1, food2));

        mockMvc.perform(get("/api/foods"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].name").value("Taco"))
                .andExpect(jsonPath("$[1].name").value("Salad"));
    }

    @Test
    public void testAddFoodIntegration() throws Exception {
        Food food = new Food("Ramen");

        mockMvc.perform(post("/api/foods")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(food)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.name").value("Ramen"))
                .andExpect(jsonPath("$.calories").value(400));
    }
}

