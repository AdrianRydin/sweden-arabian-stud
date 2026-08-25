/* eslint-disable @next/next/no-img-element */

"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  Eye,
  EyeOff,
  LogOut,
  Images,
} from "lucide-react";
import {
  createEmptyHorse,
  Horse,
  horseSectionLabels,
  horseSectionPluralLabels,
  horseSections,
  HorseSection,
} from "../../data/horseData";
import { createEmptyMoment, Moment } from "../../data/momentData";
import { HorseEditPanel } from "../../components/HorseEditPanel";
import { MomentEditPanel } from "../../components/MomentEditPanel";
import { useRouter } from "next/navigation";

type FilterSection = "all" | HorseSection;
type DashboardTab = "horses" | "moments";

export default function AdminDashboard() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<DashboardTab>("horses");

  const [horses, setHorses] = useState<Horse[]>([]);
  const [editingHorse, setEditingHorse] = useState<Horse | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [filterSection, setFilterSection] = useState<FilterSection>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [moments, setMoments] = useState<Moment[]>([]);
  const [editingMoment, setEditingMoment] = useState<Moment | null>(null);
  const [isCreatingMoment, setIsCreatingMoment] = useState(false);
  const [isLoadingMoments, setIsLoadingMoments] = useState(true);
  const [isSavingMoment, setIsSavingMoment] = useState(false);
  const [momentErrorMessage, setMomentErrorMessage] = useState("");

  async function fetchHorses() {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const res = await fetch("/api/admin/horses", {
        method: "GET",
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch horses");
      }

      const data = await res.json();
      setHorses(data);
    } catch (error) {
      console.error(error);
      setErrorMessage("Could not load horses.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchHorses();
  }, []);

  async function fetchMoments() {
    try {
      setIsLoadingMoments(true);
      setMomentErrorMessage("");

      const res = await fetch("/api/admin/moments", {
        method: "GET",
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch moments");
      }

      const data = await res.json();
      setMoments(data);
    } catch (error) {
      console.error(error);
      setMomentErrorMessage("Could not load moments.");
    } finally {
      setIsLoadingMoments(false);
    }
  }

  useEffect(() => {
    fetchMoments();
  }, []);

  const handleCreateNewMoment = () => {
    setEditingMoment(createEmptyMoment());
    setIsCreatingMoment(true);
  };

  const handleSaveMoment = async (moment: Moment) => {
    try {
      setIsSavingMoment(true);
      setMomentErrorMessage("");

      const url = isCreatingMoment
        ? "/api/admin/moments"
        : `/api/admin/moments/${moment._id}`;

      const method = isCreatingMoment ? "POST" : "PATCH";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(moment),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to save moment");
      }

      if (isCreatingMoment) {
        setMoments((current) => [data, ...current]);
      } else {
        setMoments((current) =>
          current.map((item) => (item._id === data._id ? data : item)),
        );
      }

      setEditingMoment(null);
      setIsCreatingMoment(false);
    } catch (error) {
      console.error(error);
      setMomentErrorMessage(
        error instanceof Error ? error.message : "Could not save moment.",
      );
    } finally {
      setIsSavingMoment(false);
    }
  };

  const handleDeleteMoment = async (moment: Moment) => {
    if (!moment._id) return;

    const confirmed = confirm(
      `Are you sure you want to delete "${moment.title}"? This cannot be undone.`,
    );

    if (!confirmed) return;

    try {
      setMomentErrorMessage("");

      const res = await fetch(`/api/admin/moments/${moment._id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete moment");
      }

      setMoments((current) =>
        current.filter((item) => item._id !== moment._id),
      );
    } catch (error) {
      console.error(error);
      setMomentErrorMessage(
        error instanceof Error ? error.message : "Could not delete moment.",
      );
    }
  };

  const handleQuickUpdateMoment = async (
    moment: Moment,
    update: Partial<Pick<Moment, "isVisible">>,
  ) => {
    if (!moment._id) return;

    try {
      setMomentErrorMessage("");

      const res = await fetch(`/api/admin/moments/${moment._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(update),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update moment");
      }

      setMoments((current) =>
        current.map((item) => (item._id === data._id ? data : item)),
      );
    } catch (error) {
      console.error(error);
      setMomentErrorMessage(
        error instanceof Error ? error.message : "Could not update moment.",
      );
    }
  };

  const filteredHorses = useMemo(() => {
    return horses.filter((horse) => {
      return filterSection === "all" || horse.section === filterSection;
    });
  }, [horses, filterSection]);

  const handleCreateNew = () => {
    setEditingHorse(createEmptyHorse());
    setIsCreating(true);
  };

  const handleSaveHorse = async (horse: Horse) => {
    try {
      setIsSaving(true);
      setErrorMessage("");

      const url = isCreating
        ? "/api/admin/horses"
        : `/api/admin/horses/${horse._id}`;

      const method = isCreating ? "POST" : "PATCH";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(horse),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to save horse");
      }

      if (isCreating) {
        setHorses((current) => [data, ...current]);
      } else {
        setHorses((current) =>
          current.map((item) => (item._id === data._id ? data : item)),
        );
      }

      setEditingHorse(null);
      setIsCreating(false);
    } catch (error) {
      console.error(error);
      setErrorMessage(
        error instanceof Error ? error.message : "Could not save horse.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteHorse = async (horse: Horse) => {
    if (!horse._id) return;

    const confirmed = confirm(
      `Are you sure you want to delete "${horse.name}"? This cannot be undone.`,
    );

    if (!confirmed) return;

    try {
      setErrorMessage("");

      const res = await fetch(`/api/admin/horses/${horse._id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete horse");
      }

      setHorses((current) => current.filter((item) => item._id !== horse._id));
    } catch (error) {
      console.error(error);
      setErrorMessage(
        error instanceof Error ? error.message : "Could not delete horse.",
      );
    }
  };

  const handleQuickUpdate = async (
    horse: Horse,
    update: Partial<Pick<Horse, "status" | "isVisible">>,
  ) => {
    if (!horse._id) return;

    try {
      setErrorMessage("");

      const res = await fetch(`/api/admin/horses/${horse._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(update),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update horse");
      }

      setHorses((current) =>
        current.map((item) => (item._id === data._id ? data : item)),
      );
    } catch (error) {
      console.error(error);
      setErrorMessage(
        error instanceof Error ? error.message : "Could not update horse.",
      );
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", {
      method: "POST",
    });

    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <div className="border-b border-[#e0e0e0] bg-white px-10 py-6">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4">
          <div>
            <h1 className="m-0 font-['Cormorant_SC'] text-[1.8rem] tracking-[0.1em] text-[#2a2a2a]">
              Admin Dashboard
            </h1>
            <p className="mt-2 mb-0 font-['Raleway'] text-xs text-[var(--text-muted)]">
              Manage your horse inventory and moments
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex gap-2 rounded border border-[#d0d0d0] p-1">
              <button
                onClick={() => setActiveTab("horses")}
                className={`rounded px-4 py-2 font-['Raleway'] text-[0.7rem] tracking-[0.1em] uppercase transition ${
                  activeTab === "horses"
                    ? "bg-[var(--teal)] text-white"
                    : "bg-transparent text-[var(--text-secondary)]"
                }`}
              >
                Horses
              </button>
              <button
                onClick={() => setActiveTab("moments")}
                className={`rounded px-4 py-2 font-['Raleway'] text-[0.7rem] tracking-[0.1em] uppercase transition ${
                  activeTab === "moments"
                    ? "bg-[var(--teal)] text-white"
                    : "bg-transparent text-[var(--text-secondary)]"
                }`}
              >
                Moments
              </button>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded border border-[#d0d0d0] bg-white px-4 py-2 font-['Raleway'] text-[0.7rem] tracking-[0.1em] text-[var(--text-secondary)] uppercase transition hover:bg-[#f5f5f5]"
            >
              <LogOut size={15} />
              Logout
            </button>
          </div>
        </div>
      </div>

      {activeTab === "horses" && (
      <div className="mx-auto max-w-[1400px] p-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setFilterSection("all")}
              className={`rounded border px-4 py-2 font-['Raleway'] text-[0.7rem] tracking-[0.1em] uppercase transition ${
                filterSection === "all"
                  ? "border-[var(--sage)] bg-[var(--sage)] text-white"
                  : "border-[#d0d0d0] bg-white text-[var(--text-secondary)]"
              }`}
            >
              All Horses
            </button>

            {horseSections.map((section) => (
              <button
                key={section}
                onClick={() => setFilterSection(section)}
                className={`rounded border px-4 py-2 font-['Raleway'] text-[0.7rem] tracking-[0.1em] uppercase transition ${
                  filterSection === section
                    ? "border-[var(--sage)] bg-[var(--sage)] text-white"
                    : "border-[#d0d0d0] bg-white text-[var(--text-secondary)]"
                }`}
              >
                {horseSectionPluralLabels[section]}
              </button>
            ))}
          </div>

          <button
            onClick={handleCreateNew}
            className="flex cursor-pointer items-center gap-2 rounded border-0 bg-[var(--teal)] px-6 py-3 font-['Raleway'] text-[0.7rem] tracking-[0.1em] text-white uppercase transition hover:bg-[var(--teal-dark)]"
          >
            <Plus size={16} />
            Add New Horse
          </button>
        </div>

        {errorMessage && (
          <div className="mb-5 rounded border border-red-200 bg-red-50 px-4 py-3 font-['Raleway'] text-sm text-red-700">
            {errorMessage}
          </div>
        )}

        <div className="mb-5 font-['Raleway'] text-xs text-[var(--text-muted)]">
          {isLoading
            ? "Loading horses..."
            : `Showing ${filteredHorses.length} horse${
                filteredHorses.length !== 1 ? "s" : ""
              }`}
        </div>

        <div className="overflow-hidden rounded-md bg-white shadow-sm">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-[#e0e0e0] bg-[#fafafa]">
                <th className="px-5 py-4 text-left font-['Raleway'] text-[0.65rem] font-semibold tracking-[0.12em] text-[var(--text-muted)] uppercase">
                  Image
                </th>
                <th className="px-5 py-4 text-left font-['Raleway'] text-[0.65rem] font-semibold tracking-[0.12em] text-[var(--text-muted)] uppercase">
                  Name
                </th>
                <th className="px-5 py-4 text-left font-['Raleway'] text-[0.65rem] font-semibold tracking-[0.12em] text-[var(--text-muted)] uppercase">
                  Section
                </th>
                <th className="px-5 py-4 text-left font-['Raleway'] text-[0.65rem] font-semibold tracking-[0.12em] text-[var(--text-muted)] uppercase">
                  Birth Year
                </th>
                <th className="px-5 py-4 text-left font-['Raleway'] text-[0.65rem] font-semibold tracking-[0.12em] text-[var(--text-muted)] uppercase">
                  Status
                </th>
                <th className="px-5 py-4 text-left font-['Raleway'] text-[0.65rem] font-semibold tracking-[0.12em] text-[var(--text-muted)] uppercase">
                  Visible
                </th>
                <th className="px-5 py-4 text-left font-['Raleway'] text-[0.65rem] font-semibold tracking-[0.12em] text-[var(--text-muted)] uppercase">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {!isLoading && filteredHorses.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-10 text-center">
                    <p className="font-['Raleway'] text-sm text-[var(--text-muted)]">
                      No horses found
                    </p>
                  </td>
                </tr>
              ) : (
                filteredHorses.map((horse) => (
                  <tr
                    key={horse._id}
                    className="border-b border-[#f0f0f0] transition-colors hover:bg-[#fafafa]"
                  >
                    <td className="px-5 py-4">
                      {horse.image ? (
                        <img
                          src={horse.image}
                          alt={horse.name}
                          className="h-[60px] w-[60px] rounded object-cover"
                        />
                      ) : (
                        <div className="h-[60px] w-[60px] rounded bg-[#eee]" />
                      )}
                    </td>

                    <td className="px-5 py-4">
                      <div className="font-['Cormorant_Garamond'] text-base font-semibold text-[#2a2a2a]">
                        {horse.name}
                      </div>
                      {horse.slug && (
                        <div className="mt-1 font-['Raleway'] text-[0.65rem] text-[var(--text-muted)]">
                          /{horse.slug}
                        </div>
                      )}
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-sm bg-[var(--beige-light)] px-2.5 py-1 font-['Raleway'] text-[0.65rem] tracking-[0.08em] text-[var(--sage-dark)] uppercase">
                        {horseSectionLabels[horse.section]}
                      </span>
                    </td>

                    <td className="px-5 py-4 font-['Raleway'] text-sm text-[var(--text-secondary)]">
                      {horse.birthYear}
                    </td>

                    <td className="px-5 py-4">
                      {horse.status === "sold" ? (
                        <span className="flex items-center gap-1 font-['Raleway'] text-[0.65rem] tracking-[0.08em] text-[#d4183d] uppercase">
                          <CheckCircle size={14} />
                          Sold
                        </span>
                      ) : (
                        <span className="font-['Raleway'] text-[0.65rem] tracking-[0.08em] text-[var(--sage)] uppercase">
                          Available
                        </span>
                      )}
                    </td>

                    <td className="px-5 py-4">
                      {horse.isVisible ? (
                        <span className="flex items-center gap-1 font-['Raleway'] text-[0.65rem] tracking-[0.08em] text-[var(--sage)] uppercase">
                          <Eye size={14} />
                          Visible
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 font-['Raleway'] text-[0.65rem] tracking-[0.08em] text-[var(--text-muted)] uppercase">
                          <EyeOff size={14} />
                          Hidden
                        </span>
                      )}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingHorse(horse);
                            setIsCreating(false);
                          }}
                          className="flex cursor-pointer items-center justify-center rounded border-0 bg-[var(--text-muted)] p-2 text-white transition hover:opacity-85"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>

                        <button
                          onClick={() =>
                            handleQuickUpdate(horse, {
                              status:
                                horse.status === "sold" ? "available" : "sold",
                            })
                          }
                          className="flex cursor-pointer items-center justify-center rounded border-0 bg-[#5b9aaf] p-2 text-white transition hover:opacity-85"
                          title={
                            horse.status === "sold"
                              ? "Mark as Available"
                              : "Mark as Sold"
                          }
                        >
                          <CheckCircle size={16} />
                        </button>

                        <button
                          onClick={() =>
                            handleQuickUpdate(horse, {
                              isVisible: !horse.isVisible,
                            })
                          }
                          className="flex cursor-pointer items-center justify-center rounded border-0 bg-[var(--sage)] p-2 text-white transition hover:opacity-85"
                          title={horse.isVisible ? "Hide" : "Show"}
                        >
                          {horse.isVisible ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                        </button>

                        <button
                          onClick={() => handleDeleteHorse(horse)}
                          className="flex cursor-pointer items-center justify-center rounded border-0 bg-[#d4183d] p-2 text-white transition hover:opacity-85"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      )}

      {activeTab === "moments" && (
      <div className="mx-auto max-w-[1400px] p-10">
        <div className="mb-8 flex flex-wrap items-center justify-end gap-4">
          <button
            onClick={handleCreateNewMoment}
            className="flex cursor-pointer items-center gap-2 rounded border-0 bg-[var(--teal)] px-6 py-3 font-['Raleway'] text-[0.7rem] tracking-[0.1em] text-white uppercase transition hover:bg-[var(--teal-dark)]"
          >
            <Plus size={16} />
            Add New Moment
          </button>
        </div>

        {momentErrorMessage && (
          <div className="mb-5 rounded border border-red-200 bg-red-50 px-4 py-3 font-['Raleway'] text-sm text-red-700">
            {momentErrorMessage}
          </div>
        )}

        <div className="mb-5 font-['Raleway'] text-xs text-[var(--text-muted)]">
          {isLoadingMoments
            ? "Loading moments..."
            : `Showing ${moments.length} moment${
                moments.length !== 1 ? "s" : ""
              }`}
        </div>

        <div className="overflow-hidden rounded-md bg-white shadow-sm">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-[#e0e0e0] bg-[#fafafa]">
                <th className="px-5 py-4 text-left font-['Raleway'] text-[0.65rem] font-semibold tracking-[0.12em] text-[var(--text-muted)] uppercase">
                  Cover
                </th>
                <th className="px-5 py-4 text-left font-['Raleway'] text-[0.65rem] font-semibold tracking-[0.12em] text-[var(--text-muted)] uppercase">
                  Title
                </th>
                <th className="px-5 py-4 text-left font-['Raleway'] text-[0.65rem] font-semibold tracking-[0.12em] text-[var(--text-muted)] uppercase">
                  Images
                </th>
                <th className="px-5 py-4 text-left font-['Raleway'] text-[0.65rem] font-semibold tracking-[0.12em] text-[var(--text-muted)] uppercase">
                  Visible
                </th>
                <th className="px-5 py-4 text-left font-['Raleway'] text-[0.65rem] font-semibold tracking-[0.12em] text-[var(--text-muted)] uppercase">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {!isLoadingMoments && moments.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-10 text-center">
                    <p className="font-['Raleway'] text-sm text-[var(--text-muted)]">
                      No moments found
                    </p>
                  </td>
                </tr>
              ) : (
                moments.map((moment) => (
                  <tr
                    key={moment._id}
                    className="border-b border-[#f0f0f0] transition-colors hover:bg-[#fafafa]"
                  >
                    <td className="px-5 py-4">
                      {moment.images?.[0] ? (
                        <img
                          src={moment.images[0]}
                          alt={moment.title}
                          className="h-[60px] w-[60px] rounded object-cover"
                        />
                      ) : (
                        <div className="h-[60px] w-[60px] rounded bg-[#eee]" />
                      )}
                    </td>

                    <td className="px-5 py-4">
                      <div className="font-['Cormorant_Garamond'] text-base font-semibold text-[#2a2a2a]">
                        {moment.title}
                      </div>
                      {moment.slug && (
                        <div className="mt-1 font-['Raleway'] text-[0.65rem] text-[var(--text-muted)]">
                          /{moment.slug}
                        </div>
                      )}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5 font-['Raleway'] text-sm text-[var(--text-secondary)]">
                        <Images size={14} />
                        {moment.images?.length || 0}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      {moment.isVisible ? (
                        <span className="flex items-center gap-1 font-['Raleway'] text-[0.65rem] tracking-[0.08em] text-[var(--sage)] uppercase">
                          <Eye size={14} />
                          Visible
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 font-['Raleway'] text-[0.65rem] tracking-[0.08em] text-[var(--text-muted)] uppercase">
                          <EyeOff size={14} />
                          Hidden
                        </span>
                      )}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingMoment(moment);
                            setIsCreatingMoment(false);
                          }}
                          className="flex cursor-pointer items-center justify-center rounded border-0 bg-[var(--text-muted)] p-2 text-white transition hover:opacity-85"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>

                        <button
                          onClick={() =>
                            handleQuickUpdateMoment(moment, {
                              isVisible: !moment.isVisible,
                            })
                          }
                          className="flex cursor-pointer items-center justify-center rounded border-0 bg-[var(--sage)] p-2 text-white transition hover:opacity-85"
                          title={moment.isVisible ? "Hide" : "Show"}
                        >
                          {moment.isVisible ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                        </button>

                        <button
                          onClick={() => handleDeleteMoment(moment)}
                          className="flex cursor-pointer items-center justify-center rounded border-0 bg-[#d4183d] p-2 text-white transition hover:opacity-85"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      )}

      {editingHorse && (
        <HorseEditPanel
          horse={editingHorse}
          isCreating={isCreating}
          isSaving={isSaving}
          onSave={handleSaveHorse}
          onCancel={() => {
            setEditingHorse(null);
            setIsCreating(false);
          }}
        />
      )}

      {editingMoment && (
        <MomentEditPanel
          moment={editingMoment}
          isCreating={isCreatingMoment}
          isSaving={isSavingMoment}
          onSave={handleSaveMoment}
          onCancel={() => {
            setEditingMoment(null);
            setIsCreatingMoment(false);
          }}
        />
      )}
    </div>
  );
}
