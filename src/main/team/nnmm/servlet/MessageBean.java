package team.nnmm.servlet;

import java.io.Serializable;
import java.util.ArrayList;

/**
 * @author Patrick_Star
 * @version 1.0
 */
public class MessageBean implements Serializable {
    private String message;
    private ArrayList data;

    public ArrayList getData() {
        return data;
    }

    public void setData(ArrayList data) {
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public MessageBean() {
    }

    public MessageBean(String message, ArrayList data) {
        this.message = message;
        this.data = data;
    }
}
