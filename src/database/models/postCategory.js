'use strict';

const PostCategory = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: {
      allowNull: false,
      primaryKey: true,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      type: DataTypes.INTEGER,
      references: {
        model: 'BlogPosts',
        key: 'id',
      }
    },
    categoryId: {
      allowNull: false,
      primaryKey: true,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      type: DataTypes.INTEGER,
      references: {
        model: 'Categories',
        key: 'id',
      }
    },
  },
  {
    timestamps: false,
  });

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: models.Category,
      foreignKey: 'id',
      otherKey: 'id',
    });

    models.Category.belongsToMany(models.BlogPost, {
      as: 'post',
      through: models.BlogPost,
      foreignKey: 'id',
      otherKey: 'id',
    });
  };

  return PostCategory;
};

module.exports = PostCategory;