package com.example.backend.data;

/**
 * Class for sending user stats
 **/
public class UserStats {
    private int wins;
    private int loses;
    private Float averagePoints;

    /**
     * @return int
     */
    public int getWins() {
        return this.wins;
    }

    /**
     * @param wins
     */
    public void setWins(int wins) {
        this.wins = wins;
    }

    /**
     * @return int
     */
    public int getLoses() {
        return this.loses;
    }

    /**
     * @param loses
     */
    public void setLoses(int loses) {
        this.loses = loses;
    }

    /**
     * @return Float
     */
    public Float getAveragePoints() {
        return this.averagePoints;
    }

    /**
     * @param averagePoints
     */
    public void setAveragePoints(Float averagePoints) {
        this.averagePoints = averagePoints;
    }
}
