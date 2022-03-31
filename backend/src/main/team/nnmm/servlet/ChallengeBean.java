package team.nnmm.servlet;

import java.io.Serializable;

/**
 * @author Patrick_Star
 * @version 1.0
 */
public class ChallengeBean implements Serializable {
    private int type;

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public ChallengeBean(int type) {
        this.type = type;
    }

    public ChallengeBean() {
    }
}
