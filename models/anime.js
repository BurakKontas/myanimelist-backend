const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const animeSchema = new Schema({
    _id: { type: String, required: true },
    title: { type: String, required: true },
    title_english: { type: String },
    title_japanese: { type: String },
    title_synonyms: { type: String },
    image_url: { type: String, required: true },
    type: { type: String, required: true },
    source: { type: String, required: true },
    episodes: { type: String, required: true },
    status: { type: String, required: true },
    airing: { type: Boolean, required: true },
    aired_string: { type: String, required: true },
    aired: { type: Object, required: true },
    duration: { type: String, required: true },
    rating:{ type: String, required: true },
    score: { type: Number },
    scored_by: { type: Number },
    rank: { type: Number, required: true },
    popularity: { type: Number },
    members: { type: Number },
    favorites: { type: Number },
    background: { type: String },
    premiered: { type: String, required: true },
    broadcast: { type: String },
    related: { type: String },
    producer: { type: String, required: true },
    licensor: { type: String },
    studio: { type: String, required: true },
    genre: { type: String, required: true },
    opening_theme: { type: String },
    ending_theme: { type: String },
}, {
  timestamps: true,
});

const Anime = mongoose.model('Anime', animeSchema);
module.exports = Anime;