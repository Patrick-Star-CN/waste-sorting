package team.nnmm.servlet;

import java.io.Serializable;

/**
 * @author Patrick_Star
 * @version 1.0
 */
public class ScoreBean implements Serializable {
    private String username;
    private String score;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getScore() {
        return score;
    }

    public void setScore(String score) {
        this.score = score;
    }

    public ScoreBean(String username, String score) {
        this.username = username;
        this.score = score;
    }

    public ScoreBean() {
    }
}
