package team.nnmm.servlet;

import java.io.Serializable;

/**
 * @author Patrick_Star
 * @version 1.0
 */
public class MessageBean implements Serializable {
    private String message;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public MessageBean() {
    }

    public MessageBean(String message) {
        this.message = message;
    }
}
