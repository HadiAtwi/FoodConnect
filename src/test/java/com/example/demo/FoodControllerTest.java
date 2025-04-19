package com.example.demo;

import com.example.demo.controller.FoodController;
import com.example.demo.model.Food;
import com.example.demo.repository.FoodRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class FoodControllerTest {

    @InjectMocks
    private FoodController foodController;

    @Mock
    private FoodRepository foodRepository;

    private List<Food> mockFoodList;

    @BeforeEach
    public void setUp() {
        mockFoodList = new ArrayList<>();
        mockFoodList.add(new Food("Pizza"));
        mockFoodList.add(new Food("Burger"));
    }

    // Tests go here
    @Test
    public void testGetAllFoods() {
        when(foodRepository.findAll()).thenReturn(mockFoodList);

        List<Food> result = foodController.getAllFoods();

        assertEquals(2, result.size());
        assertEquals("Pizza", result.get(0).getName());
        verify(foodRepository, times(1)).findAll();
    }

    @Test
    public void testAddFood() {
        Food newFood = new Food("Sushi");
        Food savedFood = new Food("Sushi");

        when(foodRepository.save(newFood)).thenReturn(savedFood);

        ResponseEntity<Food> response = foodController.addFood(newFood);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(savedFood, response.getBody());
        verify(foodRepository, times(1)).save(newFood);
    }
}
