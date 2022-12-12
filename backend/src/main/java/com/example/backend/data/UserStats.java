package com.example.backend.data;

public class UserStats {
    private int wins;
    private int loses;
    private Float averagePoints;

    public int getWins() {
        return this.wins;
    }

    public void setWins(int wins) {
        this.wins = wins;
    }

    public int getLoses() {
        return this.loses;
    }

    public void setLoses(int loses) {
        this.loses = loses;
    }

    public Float getAveragePoints() {
        return this.averagePoints;
    }

    public void setAveragePoints(Float averagePoints) {
        this.averagePoints = averagePoints;
    }
}
