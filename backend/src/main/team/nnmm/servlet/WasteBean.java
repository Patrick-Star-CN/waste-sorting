package team.nnmm.servlet;

import java.io.Serializable;

/**
 * @author Patrick_Star
 * @version 1.0
 */
public class WasteBean implements Serializable {
    private String name;
    private int id;
    private int width;
    private int height;
    private int type;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getWidth() {
        return width;
    }

    public void setWidth(int width) {
        this.width = width;
    }

    public int getHeight() {
        return height;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public WasteBean(String name, int id, int width, int height, int type) {
        this.name = name;
        this.id = id;
        this.width = width;
        this.height = height;
        this.type = type;
    }

    public WasteBean() {
    }
}
